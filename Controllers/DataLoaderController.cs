using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PokeTactician_Backend.Services;

namespace PokeTactician_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataLoaderController : ControllerBase
    {
        private readonly DataLoaderService _dataLoaderService;

        public DataLoaderController(DataLoaderService dataLoaderService)
        {
            _dataLoaderService = dataLoaderService;
        }

        [HttpPost("load-games")]
        public async Task<IActionResult> LoadGames()
        {
            await _dataLoaderService.LoadGamesAsync("Data/JSON/games.json");
            return Ok("Games loaded successfully.");
        }

        [HttpPost("load-types")]
        public async Task<IActionResult> LoadTypes()
        {
            await _dataLoaderService.LoadTypesAsync("Data/JSON/pokemon_types.json");
            return Ok("Pokemon Types loaded successfully.");
        }

        [HttpPost("load-moves")]
        public async Task<IActionResult> LoadMoves()
        {
            await _dataLoaderService.LoadMovesAsync("Data/JSON/move_data.json");
            return Ok("Moves loaded successfully.");
        }

        [HttpPost("load-pokemons")]
        public async Task<IActionResult> LoadPokemons()
        {
            await _dataLoaderService.LoadPokemonsAsync("Data/JSON/pokemon_data.json");
            return Ok("Pokemons loaded successfully.");
        }
    }
}