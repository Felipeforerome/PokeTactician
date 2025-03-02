using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokeTactician.DTOs;
using PokeTactician.Models;

namespace PokeTactician.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StrategiesController(PokemonContext context, IMapper mapper) : ControllerBase
    {
        private readonly PokemonContext _context = context;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StrategyDTO>>> GetStrategies()
        {
            var strategies = await _context.Strategies.ToListAsync();
            var strategiesDtos = _mapper.Map<List<StrategyDTO>>(strategies);
            return strategiesDtos;
        }
    }
}