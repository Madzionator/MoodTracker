using MoodTracker.API.Database;
using MoodTracker.API.DTO;
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

    public void AddFollow(int id)
    {
        throw new NotImplementedException();
    }

    public void RemoveFollow(int id)
    {
        throw new NotImplementedException();
    }

    public void AcceptFollow(int id, bool isAccepted)
    {
        throw new NotImplementedException();
    }

    public List<UserSearchDto> WaitingForFollow()
    {
        throw new NotImplementedException();
    }
}