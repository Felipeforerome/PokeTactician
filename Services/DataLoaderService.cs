using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PokeTactician_Backend.DTOs;
using PokeTactician_Backend.Models;

namespace PokeTactician_Backend.Services
{
    public class DataLoaderService
    {
        private readonly PokemonContext _context;
        private readonly IMapper _mapper;

        public DataLoaderService(PokemonContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task LoadGamesAsync(string filePath)
        {
            var json = await File.ReadAllTextAsync(filePath);
            var gameDtos = JsonConvert.DeserializeObject<List<GameDto>>(json) ?? throw new InvalidDataException("The games data could not be loaded.");
            foreach (var gameDto in gameDtos)
            {
                var game = _mapper.Map<GameDto, Game>(gameDto);
                _context.Games.Add(game);
            }

            await _context.SaveChangesAsync();
        }

        public async Task LoadTypesAsync(string filePath)
        {
            var json = await File.ReadAllTextAsync(filePath);
            var types = JsonConvert.DeserializeObject<List<PokemonTypeDtoIn>>(json) ?? throw new InvalidDataException("The types data could not be loaded.");
            foreach (var typeDto in types)
            {
                var type = _mapper.Map<PokemonTypeDtoIn, PokemonType>(typeDto);
                _context.Types.Add(type);
            }

            await _context.SaveChangesAsync();
        }
        public async Task LoadMovesAsync(string filePath)
        {
            var json = await File.ReadAllTextAsync(filePath);
            var moveDtos = JsonConvert.DeserializeObject<List<MoveDtoIn>>(json);

            if (moveDtos == null)
            {
                throw new InvalidDataException("The moves data could not be loaded.");
            }
            foreach (var moveDto in moveDtos)
            {
                var pokemonType = await _context.Types.FindAsync(moveDto.TypeId) ?? throw new InvalidDataException("The type of the move could not be found.");
                var move = _mapper.Map<MoveDtoIn, Move>(moveDto);
                move.Type = pokemonType;
                _context.Moves.Add(move);
            }

            await _context.SaveChangesAsync();
        }

        public async Task LoadPokemonsAsync(string filePath)
        {
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
                    var moves = await _context.Moves
                        .Where(m => pokemonDto.MoveIds.Contains(m.Id))
                        .ToListAsync();
                    pokemon.KnowableMoves = moves;
                }

                // Retrieve and set the games
                if (pokemonDto.GameIds != null && pokemonDto.GameIds.Any())
                {
                    var games = await _context.Games
                        .Where(g => pokemonDto.GameIds.Contains(g.Id))
                        .ToListAsync();
                    pokemon.Games = games;
                }

                // Retrieve and set the types
                var type1 = await _context.Types.FindAsync(pokemonDto.Type1Id);
                if (type1 == null)
                {
                    throw new InvalidDataException("The primary type of the pokemon could not be found.");
                }
                pokemon.Type1 = type1;

                var type2 = await _context.Types.FindAsync(pokemonDto.Type2Id);
                if (pokemonDto.Type2Id != null & pokemonDto.Type2Id != 0 & type2 == null)
                {
                    throw new InvalidDataException("Type2 was not found.");
                }
                pokemon.Type2 = type2;
                _context.Pokemons.Add(pokemon);
            }

            await _context.SaveChangesAsync();
        }
    }
}