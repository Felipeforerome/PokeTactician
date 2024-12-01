using AutoMapper;
using PokeTactician_Backend.Models;
using PokeTactician_Backend.DTOs;

namespace PokeTactician_Backend.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Pokemon, PokemonDtoOut>()
                .ForMember(dest => dest.Type1, opt => opt.MapFrom(src => new PokemonTypeDto { Name = src.Types[0].Name }))
                .ForMember(dest => dest.Type2, opt => opt.MapFrom(src => src.Types.Count > 1 ? new PokemonTypeDto { Name = src.Types[1].Name } : null))
                .ForMember(dest => dest.KnowableMoves, opt => opt.MapFrom(src => src.KnowableMoves == null ? new List<MoveDto>() : src.KnowableMoves.Select(m => new MoveDto { Id = m.Id }).ToList()));
            CreateMap<Move, MoveDto>();
            CreateMap<PokemonType, PokemonTypeDto>();
        }
    }
}