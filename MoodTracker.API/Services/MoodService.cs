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

    public void AddMood(MoodAddDto dto)
    {
        var userId = _userInfoProvider.Id;
        if (userId == null)
        {
            throw new UserIdNotFoundException();
        }

        var moods = _context.Moods
            .Where(x => x.UserId == userId && x.DateTime == dto.DateTime)
            .ToList();

        var catIdList = new List<int>();

        foreach (var val in dto.Values)
        {
            if(catIdList.Contains(val.CategoryId))
                continue;

            catIdList.Add(val.CategoryId);
            var md = moods.Find(x => x.CategoryId == val.CategoryId);
            if (md is null)
            {
                md = _mapper.Map<Mood>(val);
                md.UserId = (int)userId;
                md.DateTime = dto.DateTime;
                _context.Moods.Add(md);
            }
            else
            {
                md.Value = val.Value;
                _context.Moods.Update(md);
            }
        }

        _context.SaveChanges();
    }

    public IList<MoodWeekDto> GetWeek()
    {
        var userId = _userInfoProvider.Id;
        if (userId == null)
        {
            throw new UserIdNotFoundException();
        }
        var mWeek = new List<MoodWeekDto>();

        var categories = _context.UserCategories
            .Where(x => x.UserId == userId)
            .Select(c => c.CategoryId)
            .ToList();

        foreach(var cat in categories)
        {
            var values = new List<int>();
            for(int i = -6; i <= 0 ; i++)
            {
                values.Add(_context.Moods
                    .Where(x => x.UserId == userId
                        && x.CategoryId == cat
                        && x.DateTime == DateTime.Today.AddDays(i))
                    .Select(v => v.Value)
                    .FirstOrDefault());
            }
            mWeek.Add(new MoodWeekDto { CategoryId = cat, Values = values });
        }
        return mWeek;
    }

    public IList<MoodWeekDto> GetMonth()
    {
        var userId = _userInfoProvider.Id;
        if (userId == null)
        {
            throw new UserIdNotFoundException();
        }
        var mWeek = new List<MoodWeekDto>();

        var categories = _context.UserCategories
            .Where(x => x.UserId == userId)
            .Select(c => c.CategoryId)
            .ToList();

        foreach (var cat in categories)
        {
            var values = new List<int>();
            for (int i = -30; i <= 0; i++)
            {
                values.Add(_context.Moods
                    .Where(x => x.UserId == userId
                        && x.CategoryId == cat
                        && x.DateTime == DateTime.Today.AddDays(i))
                    .Select(v => v.Value)
                    .FirstOrDefault());
            }
            mWeek.Add(new MoodWeekDto { CategoryId = cat, Values = values });
        }
        return mWeek;
    }
}