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
    public class TypeController(PokemonContext context, IMapper mapper) : ControllerBase
    {
        private readonly PokemonContext _context = context;
        private readonly IMapper _mapper = mapper;

        // GET: api/Type
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PokemonTypeDtoOut>>> GetTypes()
        {
            var pokemonType = await _context.Types.ToListAsync();
            var pokemonTypeDto = _mapper.Map<List<PokemonTypeDtoOut>>(pokemonType);
            return pokemonTypeDto;
        }

        // GET: api/Type/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PokemonTypeDtoOut>> GetPokemonType(int id)
        {
            var pokemonType = await _context.Types.FindAsync(id);

            if (pokemonType == null)
            {
                return NotFound();
            }
            var pokemonTypeDto = _mapper.Map<PokemonTypeDtoOut>(pokemonType);
            return pokemonTypeDto;
        }
    }
}
