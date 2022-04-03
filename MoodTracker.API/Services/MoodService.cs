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

    public MoodService(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void AddMood(MoodDto dto, int? userId)
    {
        if (userId == null)
        {
            throw new UserIdNotFoundException();
        }

        if (_context.Moods
            .Where(x => x.UserId == userId)
            .Any(x => x.DateTime.Date == dto.DateTime.Date))
        {
            throw new MoodForTodayAlreadyExistException();
        }

        var mood = _mapper.Map<Mood>(dto);
        mood.UserId = userId ?? -1;
        _context.Moods.Add(mood);
        _context.SaveChanges();
    }

    public IList<MoodDto> GetMoods(int? userId)
    {
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

