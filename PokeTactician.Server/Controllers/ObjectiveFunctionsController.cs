using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokeTactician.DTOs;
using PokeTactician.Models;

namespace PokeTactician.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ObjectiveFunctionController(PokemonContext context, IMapper mapper) : ControllerBase
    {
        private readonly PokemonContext _context = context;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ObjectiveFunctionDTO>>> GetStrategies()
        {
            var objectiveFunction = await _context.ObjectiveFunctions.ToListAsync();
            var objectiveFunctionDtos = _mapper.Map<List<ObjectiveFunctionDTO>>(objectiveFunction);
            return objectiveFunctionDtos;
        }
    }
}