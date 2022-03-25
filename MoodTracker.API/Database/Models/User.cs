namespace MoodTracker.API.Database.Models;

public class User : ICreatedAt, IModifiedAt
{
    public Guid Id { get; set; }
    public string UserName { get; set; }
    public string EmailAddress { get; set; }
    public string Password { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? ModifiedAt { get; set; }
}
