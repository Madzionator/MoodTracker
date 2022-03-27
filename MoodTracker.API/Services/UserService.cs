using AutoMapper;
using MoodTracker.API.Database;
using MoodTracker.API.Database.Models;
using MoodTracker.API.DTO;
using MoodTracker.API.Interfaces;

namespace MoodTracker.API.Services;

internal class UserService : IUserService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IAuthManager _authManager;

    public UserService(DataContext context, IMapper mapper, IAuthManager authManager)
    {
        _context = context;
        _mapper = mapper;
        _authManager = authManager;
    }

    public void CreateUser(UserDto dto)
    {
        if (_context.Users.Any(x => x.EmailAddress == dto.EmailAddress))
        {
            //todo: throw new exception that email address is already use
            return;
        }

        if (_context.Users.Any(x => x.UserName == dto.UserName))
        {
            //todo: throw new exception that username is already use
            return;
        }

        var user = _mapper.Map<User>(dto);
        //todo: hash password
        _context.Users.Add(user);
        _context.SaveChanges();

        //todo: automatically login after registration
    }

    public string Login(UserLoginDto dto)
    {
        var user = _context.Users.FirstOrDefault(x => x.UserName == dto.Login || x.EmailAddress == dto.Login);
        if (user is null)
        {
            //todo: throw new exception that not found
            return "";
        }

        //todo: check hash password

        //temporary:
        if (user.Password != dto.Password)
        {
            //todo: throw new exception that wrong password
            return "";
        }

        var token = _authManager.CreateToken(user);
        return token;
    }
}