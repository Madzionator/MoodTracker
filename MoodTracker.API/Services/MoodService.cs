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

    public IList<MoodWeekDto> GetWeek()
    {
        var userId = _userInfoProvider.Id;
        if (userId == null)
        {
            throw new UserIdNotFoundException();
        }

        var categories = _context.UserCategories
            .Where(x => x.UserId == userId)
            .Select(c => c.CategoryId)
            .ToList();
        var mWeek = new List<MoodWeekDto>();

        foreach(var cat in categories)
        {
            var values = _context.Moods
            .Where(x => x.UserId == userId
                && x.CategoryId == cat
                && x.DateTime <= DateTime.Today
                && x.DateTime >= DateTime.Today.AddDays(-6))
            .OrderBy(x => x.DateTime)
            .Select(v => v.Value)
            .ToList();
            var weekdto = new MoodWeekDto { CategoryId = cat, Values = values };
            mWeek.Add(weekdto);
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

        var categories = _context.UserCategories
            .Where(x => x.UserId == userId)
            .Select(c => c.CategoryId)
            .ToList();
        var mWeek = new List<MoodWeekDto>();

        foreach (var cat in categories)
        {
            var values = _context.Moods
            .Where(x => x.UserId == userId
                && x.CategoryId == cat
                && x.DateTime <= DateTime.Today
                && x.DateTime >= DateTime.Today.AddDays(-30))
            .OrderBy(x => x.DateTime)
            .Select(v => v.Value)
            .ToList();
            var weekdto = new MoodWeekDto { CategoryId = cat, Values = values };
            mWeek.Add(weekdto);
        }
        return mWeek;
    }
}