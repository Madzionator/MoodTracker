using MoodTracker.API.DTO;

namespace MoodTracker.API.Interfaces;
public interface IAdviceService
{
    AdviceDto GetAdvice(int CategoryId);
}
