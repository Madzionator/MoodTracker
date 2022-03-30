using AutoMapper;
using MoodTracker.API.Database;
using MoodTracker.API.Database.Models;
using MoodTracker.API.DTO;
using MoodTracker.API.Exceptions;
using MoodTracker.API.Interfaces;

namespace MoodTracker.API.Services;

internal class UserService : IUserService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IAuthManager _authManager;
    private readonly IHashService _hashService;

    public UserService(DataContext context, IMapper mapper, IAuthManager authManager, IHashService hashService)
    {
        _context = context;
        _mapper = mapper;
        _authManager = authManager;
        _hashService = hashService;
    }

    public void CreateUser(UserDto dto)
    {
        if (_context.Users.Any(x => x.EmailAddress == dto.EmailAddress))
        {
            throw new UserEmailAlreadyExistException(dto.EmailAddress);
        }

        if (_context.Users.Any(x => x.UserName == dto.UserName))
        {
            throw new UserNameAlreadyExistException(dto.UserName);
        }

        var user = _mapper.Map<User>(dto);
        user.Password = _hashService.Hash(dto.Password);
        _context.Users.Add(user);
        _context.SaveChanges();

        //todo?: automatically login after registration
    }

    public string Login(UserLoginDto dto)
    {
        var user = _context.Users.FirstOrDefault(x => x.UserName == dto.Login || x.EmailAddress == dto.Login);
        if (user is null)
        {
            throw new UserNotFoundException(dto.Login);
        }

        if (!_hashService.Check(user.Password, dto.Password))
        {
            throw new UserWrongPasswordException();
        }

        var token = _authManager.CreateToken(user);
        return token;
    }
}