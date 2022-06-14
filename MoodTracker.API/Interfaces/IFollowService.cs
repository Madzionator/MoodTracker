using MoodTracker.API.DTO;

public interface IFollowService
{
    List<UserBaseDto> WaitingFollowers();
    List<UserBaseDto> Following();
    List<UserBaseDto> Followers();
    void AddFollow(int userId);
    void RemoveFollow(int userId);
    void RevokeFollower(int userId);
    void AcceptFollow(int userId);
}