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
namespace PokeTactician.Controllers
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
    }
}
