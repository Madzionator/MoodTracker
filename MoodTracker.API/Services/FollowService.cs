using MoodTracker.API.Database;
using MoodTracker.API.Database.Models;
using MoodTracker.API.DTO;
using MoodTracker.API.Exceptions;
using MoodTracker.API.Interfaces;

internal class FollowService : IFollowService
{
    private readonly DataContext _context;
    private readonly IUserInfoProvider _userInfoProvider;

    public FollowService(DataContext context, IUserInfoProvider userInfoProvider)
    {
        _userInfoProvider = userInfoProvider;
        _context = context;
    }
    public List<UserBaseDto> WaitingFollowes()
    {
        throw new NotImplementedException();
    }
    
    public void AddFollow(int userId)
    {
        var myId = _userInfoProvider.Id;
        if (myId == null)
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
        if (myId == null)
            throw new UserIdNotFoundException();

        var follow = _context.Follows.Find((int)myId, userId);
        _context.Follows.Remove(follow);
        _context.SaveChanges();
    }

    public void RevokeFollower(int userId)
    {
        throw new NotImplementedException();
    }

    public void AcceptFollow(int userId)
    {
        throw new NotImplementedException();
    }

    public void RejectFollow(int userId)
    {
        throw new NotImplementedException();
    }
}