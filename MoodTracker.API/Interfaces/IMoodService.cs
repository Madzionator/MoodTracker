using MoodTracker.API.DTO;

namespace MoodTracker.API.Interfaces;

public interface IMoodService
{
    void AddMood(MoodAddDto dto);
    IList<MoodDto> GetMoods();
    IList<MoodWeekDto> GetWeek();
    IList<MoodWeekDto> GetMonth();
}