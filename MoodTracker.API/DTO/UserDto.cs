namespace MoodTracker.API.DTO;

public class UserDto
{
    public string UserName { get; set; }
    public string EmailAddress { get; set; }
    public string Password { get; set; }
}
public class UserLoginDto
{
    public string Login { get; set; }
    public string Password { get; set; }
}