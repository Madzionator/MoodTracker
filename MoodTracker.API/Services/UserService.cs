using MoodTracker.API.Database;
using MoodTracker.API.DTO;

namespace MoodTracker.API.Services;

public interface IUserService
{
    void CreateUser(UserDto user);
    string Login(UserLoginDto user);
}

internal class UserService : IUserService
{
    private readonly DataContext _context;

    public UserService(DataContext context)
    {
        _context = context;

    }

    public void CreateUser(UserDto dto)
    {
      
    }

    public string Login(UserLoginDto user)
    {
        return "";
    }
}