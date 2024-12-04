using AutoMapper;
using PokeTactician_Backend.Models;
using PokeTactician_Backend.DTOs;

namespace PokeTactician_Backend.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PokemonDtoIn, Pokemon>();
            CreateMap<Pokemon, PokemonDtoOut>()
                .ForMember(dest => dest.KnowableMoves, opt => opt.MapFrom(src => src.KnowableMoves != null ? src.KnowableMoves.Select(m => m.Id) : Enumerable.Empty<int>()))
                .ForMember(dest => dest.Games, opt => opt.MapFrom(src => src.Games != null ? src.Games.Select(g => g.Id) : Enumerable.Empty<int>()));
            CreateMap<Move, MoveDtoOut>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type));
            CreateMap<MoveDtoIn, Move>();
            CreateMap<PokemonType, PokemonTypeDto>();
            CreateMap<PokemonTypeDto, PokemonType>();
        }
    }
}