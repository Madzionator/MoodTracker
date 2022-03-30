namespace MoodTracker.API.Exceptions;
public class ProjectException : Exception
{
    public int ErrorCode { get; }

    public ProjectException(string message, int errorCode = 400) : base(message)
    {
        ErrorCode = errorCode;
    }
}
