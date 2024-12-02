using AutoMapper;
using PokeTactician_Backend.Models;
using PokeTactician_Backend.DTOs;

namespace PokeTactician_Backend.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Pokemon, PokemonDtoOut>();
            CreateMap<Move, MoveDto>();
            CreateMap<PokemonType, PokemonTypeDto>();
            CreateMap<PokemonTypeDto, PokemonType>();
        }
    }
}