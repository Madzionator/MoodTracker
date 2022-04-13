using AutoMapper;
using MoodTracker.API.Database.Models;

namespace MoodTracker.API.DTO;

public class MapperConfiguration : Profile
{
    public MapperConfiguration()
    {
        CreateMap<User, UserRegDto>().ReverseMap();
        CreateMap<User, UserLoginDto>().ReverseMap();
        CreateMap<User, UserDto>().ReverseMap();
        //CreateMap<Mood, MoodDto>().ReverseMap();
    }
}