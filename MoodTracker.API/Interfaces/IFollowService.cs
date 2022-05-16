using MoodTracker.API.DTO;

namespace MoodTracker.API.Interfaces;

public interface IFollowService
{
    void AddFollow(int id);
    void RemoveFollow(int id);
    void AcceptFollow(int id, bool isAccepted);
    List<UserSearchDto> WaitingForFollow();
}