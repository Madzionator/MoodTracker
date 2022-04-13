using AutoMapper;
using MoodTracker.API.Database;
using MoodTracker.API.Database.Models;
using MoodTracker.API.DTO;
using MoodTracker.API.Exceptions;
using MoodTracker.API.Interfaces;
namespace MoodTracker.API.Services;

internal class MoodService : IMoodService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IUserInfoProvider _userInfoProvider;

    public MoodService(DataContext context, IMapper mapper, IUserInfoProvider userInfoProvider)
    {
        _context = context;
        _mapper = mapper;
        _userInfoProvider = userInfoProvider;
    }

    public void AddMood(MoodDto dto)
    {
        var userId = _userInfoProvider.Id;
        if (userId == null)
        {
            throw new UserIdNotFoundException();
        }

        if (_context.Moods
            .Where(x => x.UserId == userId)
            .Any(x => x.DateTime.Date == dto.DateTime.Date))
        {
            //todo: do update instead of that
            throw new MoodForTodayAlreadyExistException();
        }

        var mood = _mapper.Map<Mood>(dto);
        mood.UserId = userId ?? -1;
        _context.Moods.Add(mood);
        _context.SaveChanges();
    }

    public IList<MoodDto> GetMoods()
    {
        var userId = _userInfoProvider.Id;
        if (userId == null)
        {
            throw new UserIdNotFoundException();
        }

        var moods = _context.Moods
        .Where(x => x.UserId == userId)
        .OrderByDescending(x => x.DateTime)
        .Select(x => _mapper.Map<MoodDto>(x))
        .ToList();

        return moods;
    }
}