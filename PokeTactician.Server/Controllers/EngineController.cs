// Controllers/JuliaController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using PokeTactician.Models;
using System.Text.Json;
using PokeTactician.DTOs;
public class EngineController(PokemonContext context, IMapper mapper) : ControllerBase
{
    private readonly PokemonContext _context = context;
    private readonly IMapper _mapper = mapper;
    [HttpPost("optimize")]
    public async Task<IActionResult> RunEngine([FromBody] Dictionary<string, object> inputData)
    {
        // Example argument: { "argument": "--poklistUrl http://localhost:8080/api/Pokemons/?preSelected=500&generations=2 --preselected 1" }
        try
        {
            var executor = new EngineExecutor();
            string resultString = await executor.ExecuteEngine(inputData);
            resultString = resultString.Replace("'", "\"");
            var resultJson = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(resultString);
            var resultTeam = new List<Pokemon>();

            if (resultJson != null && resultJson.ContainsKey("team"))
            {
                var team = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(resultJson["team"].ToString());
                if (team != null)
                {
                    foreach (var pokemon in team)
                    {
                        var moves = pokemon.ContainsKey("moves") && pokemon["moves"] != null && pokemon["moves"].ToString() != null ? JsonSerializer.Deserialize<List<int>>(pokemon["moves"].ToString()) : new List<int>();
                        var pokemonId = pokemon["pokemon"] != null ? JsonSerializer.Deserialize<int>(pokemon["pokemon"].ToString()) : 0;
                        var dbPokemon = await _context.Pokemons
                            .Include(p => p.Type1)
                            .Include(p => p.Type2)
                            .Include(p => p.KnowableMoves)
                            .ThenInclude(km => km.Type)
                            .FirstOrDefaultAsync(p => p.Id == pokemonId);

                        if (dbPokemon != null)
                        {
                            resultTeam.Add(dbPokemon);
                        }
                    }
                }
                var pokemonDtoOut = _mapper.Map<List<PokemonDtoOut>>(resultTeam);
                return Ok(pokemonDtoOut);
            }
            else
            {
                return StatusCode(500, "Error: 'team' key not found in the result.");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error running Optimization Engine: {ex.Message}");
        }
    }
}
