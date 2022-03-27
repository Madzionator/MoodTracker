using MoodTracker.API.DTO;

namespace MoodTracker.API.Interfaces;

public interface IUserService
{
    void CreateUser(UserDto dto);
    string Login(UserLoginDto dto);
}