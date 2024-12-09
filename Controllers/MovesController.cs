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
    public class MovesController : ControllerBase
    {
        private readonly PokemonContext _context;
        private readonly IMapper _mapper;

        public MovesController(PokemonContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Moves
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MoveDtoOut>>> GetMoves()
        {
            var move = await _context.Moves
                .Include(p => p.Type)
                .ToListAsync();

            var moveDtoOut = _mapper.Map<List<MoveDtoOut>>(move);

            return moveDtoOut;

        }

        // GET: api/Moves/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MoveDtoOut>> GetMove(int id)
        {
            var move = await _context.Moves
                .Include(p => p.Type)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (move == null)
            {
                return NotFound();
            }

            var moveDtoOut = _mapper.Map<MoveDtoOut>(move);

            return moveDtoOut;
        }

        // PUT: api/Moves/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMove(int id, Move move)
        {
            if (id != move.Id)
            {
                return BadRequest();
            }

            _context.Entry(move).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MoveExists(id))
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

        // POST: api/Moves
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MoveDtoOut>> PostMove(MoveDtoIn moveDtoIn)
        {

            var move = _mapper.Map<Move>(moveDtoIn);

            _context.Moves.Add(move);
            await _context.SaveChangesAsync();

            var moveDtoOut = _mapper.Map<MoveDtoOut>(move);
            return CreatedAtAction("GetMove", new { id = moveDtoOut.Id }, moveDtoOut);
        }

        // DELETE: api/Moves/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMove(int id)
        {
            var move = await _context.Moves.FindAsync(id);
            if (move == null)
            {
                return NotFound();
            }

            _context.Moves.Remove(move);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MoveExists(int id)
        {
            return _context.Moves.Any(e => e.Id == id);
        }
    }
}
