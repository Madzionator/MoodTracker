using MoodTracker.API.Database.Models;
using MoodTracker.API.DTO;

namespace MoodTracker.API.Interfaces;

public interface IMoodService
{
    void AddMood(MoodDto dto, int? userId);

    IList<MoodDto> GetMoods(int? userId);
}

