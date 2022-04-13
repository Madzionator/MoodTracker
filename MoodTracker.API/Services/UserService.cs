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
    private readonly IUserInfoProvider _userInfoProvider;

    public UserService(DataContext context, IMapper mapper, IAuthManager authManager, IHashService hashService, IUserInfoProvider userInfoProvider)
    {
        _context = context;
        _mapper = mapper;
        _authManager = authManager;
        _hashService = hashService;
        _userInfoProvider = userInfoProvider;
    }

    public void CreateUser(UserRegDto userRegDto)
    {
        if (_context.Users.Any(x => x.EmailAddress == userRegDto.EmailAddress))
        {
            throw new UserEmailAlreadyExistException(userRegDto.EmailAddress);
        }

        if (_context.Users.Any(x => x.UserName == userRegDto.UserName))
        {
            throw new UserNameAlreadyExistException(userRegDto.UserName);
        }

        var user = _mapper.Map<User>(userRegDto);
        user.Password = _hashService.Hash(userRegDto.Password);
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

    public UserInfoDto GetInfo()
    {
        var user = _userInfoProvider.CurrentUser;
        var info = _mapper.Map<UserInfoDto>(user);
        return info;
    }
}
