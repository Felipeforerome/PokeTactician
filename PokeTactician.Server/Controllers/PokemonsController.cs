using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokeTactician.Models;
using PokeTactician.DTOs;
using AutoMapper;
using LinqKit;
namespace PokeTactician.Controllers
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
            [FromQuery] List<int>? games = null,
            [FromQuery] List<int>? generations = null,
            [FromQuery] bool? heuristic = null
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
                if (!legendary.Value)
                {
                    predicate = predicate.And(p => p.Legendary == legendary.Value && p.Mythical == false);
                }
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
            if (heuristic.HasValue)
            {
                predicate = predicate.And(p => p.Hp + p.Att + p.Deff + p.SpAtt + p.SpDeff + p.Spe >= 500);
            }
            if (games != null && games.Any())
            {
                predicate = predicate.And(p => p.Games.Any(g => games.Contains(g.Id)));
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
                .ThenInclude(km => km.Type)
                .Include(p => p.Games)
                .AsQueryable()
                .Where(predicate);

            if (preSelected != null && preSelected.Any())
            {
                query = query.OrderBy(p => p.Id).OrderByDescending(p => preSelected.Contains(p.Id));
            }

            var pokemons = await query.ToListAsync();
            var pokemonDtos = _mapper.Map<List<PokemonDtoOut>>(pokemons);

            return pokemonDtos;
        }

        // GET: api/Pokemons/namesList
        [HttpGet("namesList")]
        public async Task<ActionResult<IEnumerable<PokemonDtoName>>> GetPokemonNamesList()
        {
            var pokemons = await _context.Pokemons
                .Where(p => p.Mega == false)
                .Where(p => p.BattleOnly == false).ToListAsync();

            var pokemonDtos = _mapper.Map<List<PokemonDtoName>>(pokemons);
            return pokemonDtos;
        }


        // GET: api/Pokemons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PokemonDtoOut>> GetPokemon(
            int id,
            [FromQuery] List<int>? moves = null
            )
        {
            var pokemon = await _context.Pokemons
                .Include(p => p.Type1) // Eager load the Types property
                .Include(p => p.Type2) // Eager load the Types property
                .Include(p => p.KnowableMoves)
                .ThenInclude(km => km.Type)
                .Include(p => p.Games)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pokemon != null && moves != null && moves.Any())
            {
                pokemon.KnowableMoves = pokemon.KnowableMoves.Where(km => moves.Contains(km.Id)).ToList();
            }

            if (pokemon == null)
            {
                return NotFound();
            }

            var pokemonDto = _mapper.Map<PokemonDtoOut>(pokemon);

            return pokemonDto;
        }

        // GET: api/Pokemons/5/moves
        [HttpGet("{id}/moves")]
        public async Task<ActionResult<IEnumerable<MoveDtoName>>> GetPokemonMoves(int id)
        {
            var pokemon = await _context.Pokemons
                .Include(p => p.KnowableMoves)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pokemon == null)
            {
                return NotFound();
            }
            var moves = pokemon.KnowableMoves;

            var moveDtoOut = _mapper.Map<List<MoveDtoName>>(moves);

            return moveDtoOut;
        }
    }
}
