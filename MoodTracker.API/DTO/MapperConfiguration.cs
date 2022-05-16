using AutoMapper;
using MoodTracker.API.Database.Models;

namespace MoodTracker.API.DTO;

public class MapperConfiguration : Profile
{
    public MapperConfiguration()
    {
        CreateMap<bool?, bool>().ConvertUsing((src, dest) => src ?? dest);

        CreateMap<User, UserRegDto>().ReverseMap();
        CreateMap<User, UserLoginDto>().ReverseMap();
        CreateMap<User, UserInfoDto>().ReverseMap();
        CreateMap<User, UserEditDto>().ReverseMap()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember is not null));
        CreateMap<User, UserSearchDto>().ReverseMap();
        CreateMap<Mood, MoodDto>().ReverseMap();
        CreateMap<Mood, MoodValueDto>().ReverseMap();
        CreateMap<Mood, MoodWeekDto>().ReverseMap(); 
    }
}