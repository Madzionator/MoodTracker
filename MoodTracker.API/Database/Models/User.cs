namespace MoodTracker.API.Database.Models;

public class User
{
    public Guid Id { get; set; }
    public string UserName { get; set; }
    public string EmailAddress { get; set; }
    public string Password { get; set; }
}
