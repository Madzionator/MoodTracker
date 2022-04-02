using MoodTracker.API.Database.Models;

namespace MoodTracker.API.Interfaces;

public interface IUserInfoProvider
{
    bool IsLogged { get; }
    int? Id { get; }
    User CurrentUser { get; }
}