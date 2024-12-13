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
    public class TypeChartController(PokemonContext context, IMapper mapper) : ControllerBase
    {
        private readonly PokemonContext _context = context;
        private readonly IMapper _mapper = mapper;

        // GET: api/TypeChart/
        [HttpGet]
        public async Task<ActionResult<List<PokemonTypeChartAttacking>>> GetPokemonTypeAttChart()
        {
            var pokemonType = await _context.Types
                .Include(t => t.Attacking!)
                .ThenInclude(te => te.DefendingType)
                .ToListAsync();

            if (pokemonType == null)
            {
                return NotFound();
            }
            var pokemonTypeDto = _mapper.Map<List<PokemonTypeChartAttacking>>(pokemonType);
            return pokemonTypeDto;
        }
        // GET: api/TypeChart/5/attChart
        [HttpGet("{id}/attChart")]
        public async Task<ActionResult<PokemonTypeChartAttacking>> GetPokemonTypeAttChart(int id)
        {
            var pokemonType = await _context.Types
                .Include(t => t.Attacking!)
                .ThenInclude(te => te.DefendingType)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (pokemonType == null)
            {
                return NotFound();
            }
            var pokemonTypeDto = _mapper.Map<PokemonTypeChartAttacking>(pokemonType);
            return pokemonTypeDto;
        }
        // GET: api/TypeChart/5/defChart
        [HttpGet("{id}/defChart")]
        public async Task<ActionResult<PokemonTypeChartDefending>> GetPokemonTypeDeffChart(int id)
        {
            var pokemonType = await _context.Types
                .Include(t => t.Defending!)
                .ThenInclude(te => te.AttackingType)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (pokemonType == null)
            {
                return NotFound();
            }
            var pokemonTypeDto = _mapper.Map<PokemonTypeChartDefending>(pokemonType);
            return pokemonTypeDto;
        }

    }
}