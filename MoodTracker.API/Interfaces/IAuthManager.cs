using MoodTracker.API.Database.Models;

namespace MoodTracker.API.Interfaces;

public interface IAuthManager
{
    string CreateToken(User user);
}