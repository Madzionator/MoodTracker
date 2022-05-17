using AutoMapper;
using AutoMapper.QueryableExtensions;
using MoodTracker.API.Database;
using MoodTracker.API.Database.Models;
using MoodTracker.API.DTO;
using MoodTracker.API.Exceptions;
using MoodTracker.API.Interfaces;
using MoodTracker.API.Migrations;

namespace MoodTracker.API.Services;

internal class UserService : IUserService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IAuthManager _authManager;
    private readonly IHashService _hashService;
    private readonly IUserInfoProvider _userInfoProvider;
    private readonly IUserCategoryService _userCategoryService;

    public UserService(DataContext context, IMapper mapper, IAuthManager authManager, IHashService hashService, IUserInfoProvider userInfoProvider, IUserCategoryService userCategoryService)
    {
        _context = context;
        _mapper = mapper;
        _authManager = authManager;
        _hashService = hashService;
        _userInfoProvider = userInfoProvider;
        _userCategoryService = userCategoryService;
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

        _userCategoryService.AddCategory(new List<int>() { 1, 2, 3, 4, 5, 6, 7 }, user.Id);

        //todo?: automatically login after registration
    }

    public string Login(UserLoginDto dto)
    {
        var user = _context.Users.FirstOrDefault(x => x.UserName == dto.Login || x.EmailAddress == dto.Login);

        if (user is null)
            throw new UserNotFoundException(dto.Login);

        if (!_hashService.Check(user.Password, dto.Password))
            throw new UserWrongPasswordException();

        var token = _authManager.CreateToken(user);
        return token;
    }

    public UserInfoDto GetInfo()
    {
        var user = _userInfoProvider.CurrentUser;
        if (user is null)
            throw new UserNotFoundException("");

        var info = _mapper.Map<UserInfoDto>(user);

        return info;
    }

    public void UpdateInfo(UserEditDto dto)
    {
        var user = _userInfoProvider.CurrentUser;
        if (user is null)
            throw new UserNotFoundException("");

        user = _mapper.Map(dto, user);

        _context.Users.Update(user);
        _context.SaveChanges();
    }

    public List<UserBaseDto> SearchUsers(string name)
    {
        var users = _context.Users
            .Where(x => x.UserName.Contains(name))
            .ProjectTo<UserBaseDto>(_mapper.ConfigurationProvider)
            .ToList();

        var user = users.FirstOrDefault(x => x.Id == (int)_userInfoProvider.Id);
        if (user is not null)
            users.Remove(user);

        return users;
    }
}
