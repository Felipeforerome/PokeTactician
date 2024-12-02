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
    public class TypeController(PokemonContext context, IMapper mapper) : ControllerBase
    {
        private readonly PokemonContext _context = context;
        private readonly IMapper _mapper = mapper;

        // GET: api/Type
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PokemonTypeDto>>> GetTypes()
        {
            var pokemonType = await _context.Types.ToListAsync();
            var pokemonTypeDto = _mapper.Map<List<PokemonTypeDto>>(pokemonType);
            return pokemonTypeDto;
        }

        // GET: api/Type/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PokemonTypeDto>> GetPokemonType(int id)
        {
            var pokemonType = await _context.Types.FindAsync(id);

            if (pokemonType == null)
            {
                return NotFound();
            }
            var pokemonTypeDto = _mapper.Map<PokemonTypeDto>(pokemonType);
            return pokemonTypeDto;
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
        public async Task<ActionResult<PokemonTypeDto>> PostPokemonType(PokemonTypeDto pokemonTypeDto)
        {
            var pokemonType = _mapper.Map<PokemonType>(pokemonTypeDto);
            _context.Types.Add(pokemonType);
            await _context.SaveChangesAsync();
            var pokemonTypeDtoOut = _mapper.Map<PokemonTypeDto>(pokemonType);
            return CreatedAtAction("GetPokemonType", new { id = pokemonType.Id }, pokemonTypeDtoOut);
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
