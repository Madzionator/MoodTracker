using MoodTracker.API.Database.Models;
using MoodTracker.API.DTO;

namespace MoodTracker.API.Interfaces;

public interface IUserService
{
    void CreateUser(UserRegDto regRegDto);
    string Login(UserLoginDto dto);
    UserDto MapUserToUserDto(User user);
}