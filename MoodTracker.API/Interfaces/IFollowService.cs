
using MoodTracker.API.DTO;

public interface IFollowService
{
    List<UserBaseDto> WaitingFollowes();
    void AddFollow(int userId);
    void RemoveFollow(int userId);
    void RevokeFollower(int userId);
    void AcceptFollow(int userId);
    void RejectFollow(int userId);
}