using MoodTracker.API.DTO;

namespace MoodTracker.API.Interfaces;

public interface IMoodService
{
    void AddMood(MoodAddDto dto);
    IList<MoodListDto> GetWeek();
    IList<MoodListDto> GetMonth();
    IList<MoodFollowedDto> GetFollowMoods();
}