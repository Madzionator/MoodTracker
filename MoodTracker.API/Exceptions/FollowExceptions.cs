namespace MoodTracker.API.Exceptions;
public class FollowAlreadyExistException : ProjectException
{
    public FollowAlreadyExistException() : base($"Relacja już istnieje.") { }
}

public class FollowSelfExistException : ProjectException
{
    public FollowSelfExistException() : base($"Nie można stworzyć relacji z samym sobą.") { }
}