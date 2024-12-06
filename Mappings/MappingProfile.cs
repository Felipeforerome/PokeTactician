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
                .ForMember(dest => dest.KnowableMoves, opt => opt.MapFrom(src => src.KnowableMoves.Select(m => m.Id)))
                .ForMember(dest => dest.Games, opt => opt.MapFrom(src => src.Games.Select(g => g.Id)));
            CreateMap<Move, MoveDtoOut>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type));
            CreateMap<MoveDtoIn, Move>();
            CreateMap<PokemonType, PokemonTypeDtoOut>();
            CreateMap<PokemonTypeDtoIn, PokemonType>();
            CreateMap<PokemonType, PokemonTypeDtoOut>();
            CreateMap<GameDto, Game>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Game));
        }
    }
}