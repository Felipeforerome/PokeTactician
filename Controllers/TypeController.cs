using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokeTactician_Backend.Models;

namespace PokeTactician_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeController(PokemonContext context) : ControllerBase
    {
        private readonly PokemonContext _context = context;

        // GET: api/Type
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PokemonType>>> GetTypes()
        {
            return await _context.Types.ToListAsync();
        }

        // GET: api/Type/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PokemonType>> GetPokemonType(int id)
        {
            var pokemonType = await _context.Types.FindAsync(id);

            if (pokemonType == null)
            {
                return NotFound();
            }

            return pokemonType;
        }

        // PUT: api/Type/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPokemonType(int id, PokemonType pokemonType)
        {
            if (id != pokemonType.Id)
            {
                return BadRequest();
            }

            _context.Entry(pokemonType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PokemonTypeExists(id))
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

        // POST: api/Type
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PokemonType>> PostPokemonType(PokemonType pokemonType)
        {
            _context.Types.Add(pokemonType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPokemonType", new { id = pokemonType.Id }, pokemonType);
        }

        // DELETE: api/Type/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePokemonType(int id)
        {
            var pokemonType = await _context.Types.FindAsync(id);
            if (pokemonType == null)
            {
                return NotFound();
            }

            _context.Types.Remove(pokemonType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PokemonTypeExists(int id)
        {
            return _context.Types.Any(e => e.Id == id);
        }
    }
}
