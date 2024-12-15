using AutoMapper;
using PokeTactician.Models;
using PokeTactician.DTOs;

namespace PokeTactician.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PokemonDtoIn, Pokemon>();
            CreateMap<Pokemon, PokemonDtoOut>()
                .ForMember(dest => dest.Type1, opt => opt.MapFrom(src => src.Type1.Name))
                .ForMember(dest => dest.Type2, opt => opt.MapFrom(src => src.Type2 != null ? src.Type2.Name : null))
                .ForMember(dest => dest.KnowableMoves, opt => opt.MapFrom(src => src.KnowableMoves.Select(m => m.Name)))
                .ForMember(dest => dest.Games, opt => opt.MapFrom(src => src.Games.Select(g => g.Name)));
            CreateMap<Move, MoveDtoOut>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.Name));
            CreateMap<MoveDtoIn, Move>();
            CreateMap<PokemonType, PokemonTypeDtoOut>();
            CreateMap<PokemonTypeDtoIn, PokemonType>();
            CreateMap<PokemonType, PokemonTypeDtoOut>();
            CreateMap<PokemonType, PokemonTypeChartAttacking>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Effectiveness, opt => opt.MapFrom(src => src.Attacking != null ? src.Attacking.ToDictionary(te => te.DefendingType.Name, te => te.Effectiveness) : new Dictionary<string, double>()));
            CreateMap<PokemonType, PokemonTypeChartDefending>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Effectiveness, opt => opt.MapFrom(src => src.Defending != null ? src.Defending.ToDictionary(te => te.AttackingType.Name, te => te.Effectiveness) : new Dictionary<string, double>()));
            CreateMap<GameDto, Game>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Game));
        }
    }
}