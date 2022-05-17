using AutoMapper;
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

    public List<UserBaseDto> WaitingFollowes()
    {
        var myId = _userInfoProvider.Id;
        if (myId is null)
            throw new UserIdNotFoundException();

        return _context.Follows
            .Where(x => x.FollowedUserId == myId && x.IsAccepted == false)
            .Include(x => x.Follower)
            .Select(f => _mapper.Map<UserBaseDto>(f.Follower))
            .ToList();
    }

    public void AddFollow(int userId)
    {
        var myId = _userInfoProvider.Id;
        if (myId is null)
            throw new UserIdNotFoundException();

        if (myId == userId)
            throw new FollowSelfExistException();

        if (_context.Follows.Find(myId, userId) is not null)
            throw new FollowAlreadyExistException();

        _context.Follows.Add(new Follow() { FollowerId = (int)myId, FollowedUserId = userId });
        _context.SaveChanges();
    }

    public void RemoveFollow(int userId)
    {
        var myId = _userInfoProvider.Id;
        if (myId is null)
            throw new UserIdNotFoundException();

        var follow = _context.Follows.Find((int)myId, userId);
        _context.Follows.Remove(follow);
        _context.SaveChanges();
    }

    public void RevokeFollower(int userId)
    {
        var myId = _userInfoProvider.Id;
        if (myId is null)
            throw new UserIdNotFoundException();

        var follow = _context.Follows.Find(userId, (int)myId);
        _context.Follows.Remove(follow);
        _context.SaveChanges();
    }

    public void AcceptFollow(int userId)
    {
        var myId = _userInfoProvider.Id;
        if (myId is null)
            throw new UserIdNotFoundException();

        var follow = _context.Follows.Find(userId, (int)myId);
        if (follow is null)
            throw new FollowNotExistException();

        follow.IsAccepted = true;
        _context.Follows.Update(follow);
        _context.SaveChanges();
    }

    public void RejectFollow(int userId)
    {
        RevokeFollower(userId);
    }
}