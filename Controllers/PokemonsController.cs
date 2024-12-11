using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokeTactician_Backend.Models;
using PokeTactician_Backend.DTOs;
using AutoMapper;
using LinqKit;
namespace PokeTactician_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonsController(PokemonContext context, IMapper mapper) : ControllerBase
    {
        private readonly PokemonContext _context = context;
        private readonly IMapper _mapper = mapper;
        // GET: api/Pokemons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PokemonDtoOut>>> GetPokemons(
            [FromQuery] List<int>? excluded = null,
            [FromQuery] List<int>? preSelected = null,
            [FromQuery] List<int>? typeId = null,
            [FromQuery] bool? exclusiveType = null,
            [FromQuery] bool? mythical = null,
            [FromQuery] bool? legendary = null,
            [FromQuery] bool? battleOnly = null,
            [FromQuery] bool? mega = null,
            [FromQuery] bool? totem = null,
            [FromQuery] List<int>? gameIds = null,
            [FromQuery] List<int>? generations = null
            )
        {
            var predicate = PredicateBuilder.New<Pokemon>(true); // Start with "true" to include all

            if (excluded != null && preSelected != null && excluded.Intersect(preSelected).Any())
            {
                return BadRequest("Excluded and preSelected lists cannot contain the same IDs.");
            }

            if (excluded != null && excluded.Any())
            {
                predicate = predicate.And(p => !excluded.Contains(p.Id));
            }
            if (typeId != null && typeId.Any())
            {
                // If exclusiveType is true, the Pokemon must have both types in the list or be a mono-type Pokemon of the types in the list
                predicate = exclusiveType.HasValue && exclusiveType.Value
                    ? predicate.And(p => (typeId.Contains(p.Type1.Id) && p.Type2 == null) || (p.Type2 != null && typeId.Contains(p.Type1.Id) && typeId.Contains(p.Type2.Id)))
                    : predicate.And(p => typeId.Contains(p.Type1.Id) || (p.Type2 != null && typeId.Contains(p.Type2.Id)));
            }
            if (mythical.HasValue)
            {
                predicate = predicate.And(p => p.Mythical == mythical.Value);
            }
            if (legendary.HasValue)
            {
                predicate = predicate.And(p => p.Legendary == legendary.Value && p.Mythical == false);
            }
            if (battleOnly.HasValue)
            {
                predicate = predicate.And(p => p.BattleOnly == battleOnly.Value);
            }
            if (mega.HasValue)
            {
                predicate = predicate.And(p => p.Mega == mega.Value);
            }
            if (totem.HasValue)
            {
                if (totem.Value)
                {
                    predicate = predicate.And(p => p.Name.Contains("totem"));
                }
                else
                {
                    predicate = predicate.And(p => !p.Name.Contains("totem"));
                }
            }
            if (gameIds != null && gameIds.Any())
            {
                predicate = predicate.And(p => p.Games.Any(g => gameIds.Contains(g.Id)));
            }
            if (generations != null && generations.Any())
            {
                var generationRanges = new Dictionary<int, (int start, int end)>
                {
                    { 1, (1, 151) },
                    { 2, (152, 251) },
                    { 3, (252, 386) },
                    { 4, (387, 493) },
                    { 5, (494, 649) },
                    { 6, (650, 721) },
                    { 7, (722, 809) },
                    { 8, (810, 905) },
                    { 9, (906, 1025) }
                };

                var generationPredicate = PredicateBuilder.New<Pokemon>(false); // Start with "false"
                foreach (var generation in generations)
                {
                    if (!generationRanges.ContainsKey(generation))
                    {
                        return BadRequest("Invalid generation number.");
                    }

                    var range = generationRanges[generation];
                    generationPredicate = generationPredicate.Or(p => range.start <= p.Id && p.Id <= range.end);
                }

                predicate = predicate.And(generationPredicate);
            }

            if (preSelected != null && preSelected.Any())
            {
                predicate = predicate.Or(p => preSelected.Contains(p.Id));
            }

            var query = _context.Pokemons
                .Include(p => p.Type1)
                .Include(p => p.Type2)
                .Include(p => p.KnowableMoves)
                .Include(p => p.Games)
                .AsQueryable()
                .Where(predicate);

            var pokemons = await query.ToListAsync();
            var pokemonDtos = _mapper.Map<List<PokemonDtoOut>>(pokemons);

            return pokemonDtos;
        }


        // GET: api/Pokemons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PokemonDtoOut>> GetPokemon(int id)
        {
            var pokemon = await _context.Pokemons
                .Include(p => p.Type1) // Eager load the Types property
                .Include(p => p.Type2) // Eager load the Types property
                .Include(p => p.KnowableMoves) // Eager load the KnowableMoves property
                .Include(p => p.Games)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pokemon == null)
            {
                return NotFound();
            }

            var pokemonDto = _mapper.Map<PokemonDtoOut>(pokemon);

            return pokemonDto;
        }

        // PUT: api/Pokemons/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPokemon(int id, Pokemon pokemon)
        {
            if (id != pokemon.Id)
            {
                return BadRequest();
            }

            _context.Entry(pokemon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PokemonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Pokemons
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PokemonDtoOut>> PostPokemon(PokemonDtoIn pokemonDto)
        {
            // Retrieve the moves from the database
            var moves = await _context.Moves
                .Include(p => p.Type)
                .Where(m => pokemonDto.MoveIds.Contains(m.Id))
                .ToListAsync();

            if (moves.Count != pokemonDto.MoveIds.Count)
            {
                return BadRequest("Some moves were not found.");
            }

            var games = await _context.Games
                .Where(m => pokemonDto.GameIds.Contains(m.Id))
                .ToListAsync();

            if (games.Count != pokemonDto.GameIds.Count)
            {
                return BadRequest("Some games were not found.");
            }

            // Create the Pokemon entity and assign the moves to it
            var pokemon = _mapper.Map<Pokemon>(pokemonDto);
            pokemon.KnowableMoves = moves;
            pokemon.Games = games;

            if (!TryValidateModel(pokemon))
            {
                return BadRequest(ModelState);
            }

            _context.Pokemons.Add(pokemon);
            await _context.SaveChangesAsync();

            var pokemonDtoOut = _mapper.Map<PokemonDtoOut>(pokemon);

            return CreatedAtAction(nameof(GetPokemon), new { id = pokemonDtoOut.Id }, pokemonDtoOut);
        }

        // DELETE: api/Pokemons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePokemon(int id)
        {
            var pokemon = await _context.Pokemons.FindAsync(id);
            if (pokemon == null)
            {
                return NotFound();
            }

            _context.Pokemons.Remove(pokemon);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PokemonExists(int id)
        {
            return _context.Pokemons.Any(e => e.Id == id);
        }
    }
}
