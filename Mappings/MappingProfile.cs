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
                .ForMember(dest => dest.KnowableMoves, opt => opt.MapFrom(src => src.KnowableMoves != null ? src.KnowableMoves.Select(m => m.Id) : Enumerable.Empty<int>()));
            CreateMap<Move, MoveDtoOut>();
            CreateMap<MoveDtoIn, Move>();
            CreateMap<PokemonType, PokemonTypeDto>();
            CreateMap<PokemonTypeDto, PokemonType>();
        }
    }
}