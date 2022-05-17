namespace MoodTracker.API.Exceptions;
public class FollowAlreadyExistException : ProjectException
{
    public FollowAlreadyExistException() : base($"Relacja już istnieje.") { }
}

public class FollowSelfException : ProjectException
{
    public FollowSelfException() : base($"Nie można stworzyć relacji z samym sobą.") { }
}

public class FollowNotExistException : ProjectException
{
    public FollowNotExistException() : base($"Nie ma takiej relacji.") { }
}