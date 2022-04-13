using MoodTracker.API.Database.Models;
using MoodTracker.API.DTO;

namespace MoodTracker.API.Interfaces;

public interface IUserService
{
    void CreateUser(UserRegDto userRegDto);
    string Login(UserLoginDto dto);
    UserInfoDto GetInfo();
}