using MoodTracker.API.DTO;

namespace MoodTracker.API.Interfaces;

public interface IMoodService
{
    AdviceDto AddMood(MoodAddDto dto);
    IList<MoodListDto> GetWeek();
    IList<MoodListDto> GetMonth();
    IList<MoodFollowedDto> GetFollowMoods();
}