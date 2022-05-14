using MoodTracker.API.DTO;

namespace MoodTracker.API.Interfaces;

public interface IMoodService
{
    void AddMood(MoodAddDto dto);
    IList<MoodWeekDto> GetWeek();
    IList<MoodWeekDto> GetMonth();
}