using MoodTracker.API.DTO;

namespace MoodTracker.API.Interfaces;

public interface IUserService
{
    void CreateUser(UserRegDto userRegDto);
    string Login(UserLoginDto dto);
    UserInfoDto GetInfo();
    void UpdateInfo(UserEditDto dto);
    List<UserBaseDto> SearchUsers(string name);
}