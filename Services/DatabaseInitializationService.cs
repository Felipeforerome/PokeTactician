using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PokeTactician_Backend.DTOs;
using PokeTactician_Backend.Models;

namespace PokeTactician_Backend.Services
{
    public class DataInitializationService : IHostedService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IMapper _mapper;
        private readonly ILogger<DataInitializationService> _logger;

        public DataInitializationService(IServiceProvider serviceProvider, IMapper mapper, ILogger<DataInitializationService> logger)
        {
            _serviceProvider = serviceProvider;
            _mapper = mapper;
            _logger = logger;
        }

        private async Task LoadGamesAsync(string filePath)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<PokemonContext>();
                var json = await File.ReadAllTextAsync(filePath);
                var gameDtos = JsonConvert.DeserializeObject<List<GameDto>>(json) ?? throw new InvalidDataException("The games data could not be loaded.");
                foreach (var gameDto in gameDtos)
                {
                    var game = _mapper.Map<GameDto, Game>(gameDto);
                    context.Games.Add(game);
                }

                await context.SaveChangesAsync();
            }
        }

        private async Task LoadTypesAsync(string filePath)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<PokemonContext>();
                var json = await File.ReadAllTextAsync(filePath);
                var types = JsonConvert.DeserializeObject<List<PokemonTypeDtoIn>>(json) ?? throw new InvalidDataException("The types data could not be loaded.");
                foreach (var typeDto in types)
                {
                    var type = _mapper.Map<PokemonTypeDtoIn, PokemonType>(typeDto);
                    context.Types.Add(type);
                }

                await context.SaveChangesAsync();
            }
        }
        private async Task LoadMovesAsync(string filePath)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<PokemonContext>();
                var json = await File.ReadAllTextAsync(filePath);
                var moveDtos = JsonConvert.DeserializeObject<List<MoveDtoIn>>(json);

                if (moveDtos == null)
                {
                    throw new InvalidDataException("The moves data could not be loaded.");
                }
                foreach (var moveDto in moveDtos)
                {
                    var move = _mapper.Map<MoveDtoIn, Move>(moveDto);
                    context.Moves.Add(move);
                }

                await context.SaveChangesAsync();
            }
        }

        private async Task LoadPokemonsAsync(string filePath)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<PokemonContext>();
                var json = await File.ReadAllTextAsync(filePath);
                var pokemons = JsonConvert.DeserializeObject<List<PokemonDtoIn>>(json);

                if (pokemons == null)
                {
                    throw new InvalidDataException("The pokemons data could not be loaded.");
                }
                foreach (var pokemonDto in pokemons)
                {

                    var pokemon = _mapper.Map<PokemonDtoIn, Pokemon>(pokemonDto);

                    // Retrieve and set the moves
                    if (pokemonDto.MoveIds != null && pokemonDto.MoveIds.Any())
                    {
                        var moves = await context.Moves
                            .Where(m => pokemonDto.MoveIds.Contains(m.Id))
                            .ToListAsync();
                        pokemon.KnowableMoves = moves;
                    }

                    // Retrieve and set the games
                    if (pokemonDto.GameIds != null && pokemonDto.GameIds.Any())
                    {
                        var games = await context.Games
                            .Where(g => pokemonDto.GameIds.Contains(g.Id))
                            .ToListAsync();
                        pokemon.Games = games;
                    }
                    context.Pokemons.Add(pokemon);
                }

                await context.SaveChangesAsync();
            }
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                _logger.LogInformation("DataLoaderHostedService is starting.");

                try
                {
                    await LoadGamesAsync("Data/JSON/games.json");
                    await LoadTypesAsync("Data/JSON/pokemon_types.json");
                    await LoadMovesAsync("Data/JSON/move_data.json");
                    await LoadPokemonsAsync("Data/JSON/pokemon_data.json");

                    _logger.LogInformation("Data loading completed successfully.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "An error occurred while loading data.");
                }
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("DataLoaderHostedService is stopping.");
            return Task.CompletedTask;
        }
    }
}