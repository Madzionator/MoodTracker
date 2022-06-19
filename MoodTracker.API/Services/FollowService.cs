using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using MoodTracker.API.Database;
using MoodTracker.API.Database.Models;
using MoodTracker.API.DTO;
using MoodTracker.API.Exceptions;
using MoodTracker.API.Interfaces;

internal class FollowService : IFollowService
{
    private readonly DataContext _context;
    private readonly IUserInfoProvider _userInfoProvider;
    private readonly IMapper _mapper;

    public FollowService(DataContext context, IUserInfoProvider userInfoProvider, IMapper mapper)
    {
        _userInfoProvider = userInfoProvider;
        _mapper = mapper;
        _context = context;
    }

    private List<UserBaseDto> GetFollowers(bool isAccepted)
    {
        var myId = _userInfoProvider.Id;

        return _context.Follows
            .Where(x => x.FollowedUserId == (int)myId && x.IsAccepted == isAccepted)
            .Include(x => x.Follower)
            .Select(f => _mapper.Map<UserBaseDto>(f.Follower))
            .ToList();
    }
    private List<UserBaseDto> GetFollowing(bool isAccepted)
    {
        var myId = _userInfoProvider.Id;

        return _context.Follows
            .Where(x => x.FollowerId == (int)myId && x.IsAccepted == isAccepted)
            .Include(x => x.FollowedUser)
            .Select(f => _mapper.Map<UserBaseDto>(f.FollowedUser))
            .ToList();
    }

    public List<UserBaseDto> WaitingFollowers()
    {
        return GetFollowers(false);
    }

    public List<UserBaseDto> Followers()
    {
        return GetFollowers(true);
    }

    public List<UserBaseDto> Following()
    {
        return GetFollowing(true);
    }

    public void AddFollow(int userId)
    {
        var myId = _userInfoProvider.Id;

        if (myId == userId)
            throw new FollowSelfException();

        if (_context.Follows.Find(myId, userId) is not null)
            throw new FollowAlreadyExistException();

        _context.Follows.Add(new Follow() { FollowerId = (int)myId, FollowedUserId = userId });
        _context.SaveChanges();
    }

    public void RemoveFollow(int userId)
    {
        var myId = _userInfoProvider.Id;

        var follow = _context.Follows.Find((int)myId, userId);
        if (follow is null) 
            throw new FollowNotExistException();

        _context.Follows.Remove(follow);
        _context.SaveChanges();
    }

    public void RevokeFollower(int userId)
    {
        var myId = _userInfoProvider.Id;

        var follow = _context.Follows.Find(userId, (int)myId);
        if (follow is null) 
            throw new FollowNotExistException();

        _context.Follows.Remove(follow);
        _context.SaveChanges();
    }

    public void AcceptFollow(int userId)
    {
        var myId = _userInfoProvider.Id;

        var follow = _context.Follows.Find(userId, (int)myId);
        if (follow is null)
            throw new FollowNotExistException();

        follow.IsAccepted = true;
        _context.Follows.Update(follow);
        _context.SaveChanges();
    }

    public FollowStatusDto GetInfo(int userId)
    {
        var myId = _userInfoProvider.Id;
        var status = new FollowStatusDto
        {
            bio = _context.Users
                .Where(x => x.Id == userId)
                .Select(x => x.Bio)
                .FirstOrDefault(),

            IsFollower = _context.Follows
                .Count(x => x.FollowerId == userId &&
                            x.FollowedUserId == myId) == 1
        };

        var f = _context.Follows
            .FirstOrDefault(x => x.FollowerId == myId && x.FollowedUserId == userId);

        if (f is null) 
            return status;

        status.IsFollowing = f.IsAccepted;
        status.IsAsked = !f.IsAccepted;

        return status;
    }
}