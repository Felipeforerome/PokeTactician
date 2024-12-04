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
        public async Task<ActionResult<IEnumerable<PokemonDtoOut>>> GetPokemons()
        {
            var pokemons = await _context.Pokemons
                .Include(p => p.Type1)
                .Include(p => p.Type2)
                .Include(p => p.KnowableMoves)
                .ToListAsync();

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

            var type1 = await _context.Types.FindAsync(pokemonDto.Type1Id);
            if (type1 == null)
            {
                return BadRequest("Type1 was not found.");
            }
            var type2 = await _context.Types.FindAsync(pokemonDto.Type2Id);
            if (pokemonDto.Type2Id != null & pokemonDto.Type2Id != 0 & type2 == null)
            {
                return BadRequest("Type2 was not found.");
            }

            // Create the Pokemon entity and assign the moves to it
            var pokemon = _mapper.Map<Pokemon>(pokemonDto);
            pokemon.Type1 = type1;
            pokemon.Type2 = type2;
            pokemon.KnowableMoves = moves;

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
