using AutoMapper;
using MoodTracker.API.Database;
using MoodTracker.API.Database.Models;
using MoodTracker.API.DTO;

namespace MoodTracker.API.Services;

public interface IUserService
{
    void CreateUser(UserDto dto);
    string Login(UserLoginDto dto);
}

internal class UserService : IUserService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public UserService(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
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

        //todo: token
        var token = "some token";

        return token; // return token Access
    }
}