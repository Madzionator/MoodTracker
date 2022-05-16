namespace MoodTracker.API.Exceptions;
public class MoodForTodayAlreadyExistException : ProjectException
{
    public MoodForTodayAlreadyExistException() : base($"Dzisiejszy nastrój wprowadzony.") { }
}

