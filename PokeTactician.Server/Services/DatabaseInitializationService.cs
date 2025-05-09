using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PokeTactician.DTOs;
using PokeTactician.Models;

namespace PokeTactician.Services
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

        private async Task LoadObjectiveFunctionsAsync(string filePath)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<PokemonContext>();
                var json = await File.ReadAllTextAsync(filePath);
                var objectiveFunctionDtos = JsonConvert.DeserializeObject<List<ObjectiveFunctionDTO>>(json) ?? throw new InvalidDataException("The roles data could not be loaded.");
                foreach (var objectiveFunctionDto in objectiveFunctionDtos)
                {
                    var objectiveFunction = _mapper.Map<ObjectiveFunctionDTO, ObjectiveFunction>(objectiveFunctionDto);
                    context.ObjectiveFunctions.Add(objectiveFunction);
                }
                await context.SaveChangesAsync();
                _logger.LogInformation("Objective Functions loaded Successfully.");
            }
        }

        private async Task LoadRolesAsync(string filePath)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<PokemonContext>();
                var json = await File.ReadAllTextAsync(filePath);
                var rolesDtos = JsonConvert.DeserializeObject<List<RoleDTO>>(json) ?? throw new InvalidDataException("The roles data could not be loaded.");
                foreach (var rolesDto in rolesDtos)
                {
                    var role = _mapper.Map<RoleDTO, Role>(rolesDto);
                    context.Roles.Add(role);
                }
                await context.SaveChangesAsync();
                _logger.LogInformation("Roles loades Successfully.");
            }
        }

        private async Task LoadStrategiesAsync(string filePath)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<PokemonContext>();
                var json = await File.ReadAllTextAsync(filePath);
                var strategiesDtos = JsonConvert.DeserializeObject<List<StrategyDTO>>(json) ?? throw new InvalidDataException("The strategies data could not be loaded.");
                foreach (var strategyDto in strategiesDtos)
                {
                    var strategy = _mapper.Map<StrategyDTO, Strategy>(strategyDto);
                    context.Strategies.Add(strategy);
                }
                await context.SaveChangesAsync();
                _logger.LogInformation("Strategiers loades Successfully.");
            }
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

                _logger.LogInformation("Games loaded successfully.");
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

                _logger.LogInformation("Types loaded successfully.");
            }
        }

        private async Task LoadTypeEffectiveness(string filePath)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<PokemonContext>();
                var json = await File.ReadAllTextAsync(filePath);
                var typeChart = JsonConvert.DeserializeObject<List<TypeEffectiveness>>(json) ?? throw new InvalidDataException("The type effectiveness data could not be loaded.");
                foreach (var typeEffectiveness in typeChart)
                {
                    context.TypeEffectivenesses.Add(typeEffectiveness);
                }
                await context.SaveChangesAsync();

                _logger.LogInformation("Type Chart loaded successfully.");
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

                _logger.LogInformation("Moves loaded successfully.");
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

                _logger.LogInformation("Pokemon loaded successfully.");
            }
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                _logger.LogInformation("DataLoaderHostedService is starting.");

                try
                {
                    await LoadObjectiveFunctionsAsync("Data/JSON/objective_functions.json");
                    await LoadRolesAsync("Data/JSON/roles.json");
                    await LoadStrategiesAsync("Data/JSON/strategies.json");
                    await LoadGamesAsync("Data/JSON/games.json");
                    await LoadTypesAsync("Data/JSON/pokemon_types.json");
                    await LoadTypeEffectiveness("Data/JSON/type_effectiveness.json");
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