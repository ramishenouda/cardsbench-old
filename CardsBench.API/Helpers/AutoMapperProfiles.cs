using AutoMapper;
using CardsBench.API.Dtos;
using CardsBench.API.Models;

namespace CardsBench.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForRegistrationDto>().ReverseMap();
            CreateMap<User, UserToReturnDto>().ReverseMap();
            CreateMap<UserForRegistrationDto, UserToReturnDto>().ReverseMap();

            CreateMap<Board, BoardToReturnDto>();
            CreateMap<BoardForUpdateDto, Board>();

            CreateMap<ListForCreationDto, List>();
            CreateMap<List, ListToReturnDto>();
            CreateMap<ListForUpdateDto, List>();

            CreateMap<CardToAddDto, Card>();
            CreateMap<Card, CardToReturnDto>();
            CreateMap<CardForUpdateDto, Card>();
        }
    }
}
