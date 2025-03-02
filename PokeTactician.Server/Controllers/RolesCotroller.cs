using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokeTactician.DTOs;
using PokeTactician.Models;

namespace PokeTactician.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController(PokemonContext context, IMapper mapper) : ControllerBase
    {
        private readonly PokemonContext _context = context;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleDTO>>> GetStrategies()
        {
            var roles = await _context.Roles.ToListAsync();
            var rolesDtos = _mapper.Map<List<RoleDTO>>(roles);
            return rolesDtos;
        }
    }
}