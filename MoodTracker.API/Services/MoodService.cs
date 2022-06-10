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
            if (catIdList.Contains(val.CategoryId))
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

    public IList<MoodListDto> GetWeek()
    {
        return GetMoods(7);
    }

    public IList<MoodListDto> GetMonth()
    {
        return GetMoods(30);
    }

    private IList<MoodListDto> GetMoods(int days, int? userId = 0)
    {
        if(userId == 0)
        {
            userId = _userInfoProvider.Id;
            if (userId == null)
            {
                throw new UserIdNotFoundException();
            }
        }

        var categories = _context.UserCategories
           .Where(x => x.UserId == userId)
           .Select(c => c.CategoryId)
           .ToList();

        return categories.Select(cat => new MoodListDto
        {
            CategoryId = cat,
            Values = Enumerable.Range(-days +1, days)
            .Select(i => _context.Moods.FirstOrDefault(x =>
                x.UserId == userId && x.CategoryId == cat && x.DateTime == DateTime.Today.AddDays(i)))
            .Select(abc => abc?.Value)
            .ToList()
        }).ToList();
    }

    public IList<MoodFollowersDto> GetFollowMoods()
    {
        var userId = _userInfoProvider.Id;
        if (userId == null)
        {
            throw new UserIdNotFoundException();
        }
        var followersdto = new List<MoodFollowersDto>();

        var followerList = _context.Follows
            .Where(x => x.FollowerId == userId && x.IsAccepted == true)
            .Select(f => f.FollowedUserId)
            .ToList();

        foreach (var fol in followerList)
        {
            var mWeek = GetMoods(7, fol);
            var name = _context.Users.Where(x => x.Id == fol).Select(i => i.UserName).ToList();

            followersdto.Add(new MoodFollowersDto { FollowedId = fol,FollowedName = name[0] ,FollowerValues =  mWeek});
        }
        return followersdto;
    }
}