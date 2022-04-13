using System.Net;

namespace MoodTracker.API.Exceptions;

public class UserNotFoundException : ProjectException
{
    public UserNotFoundException(string login) : base($"Użytkownik {login} nie istnieje.", HttpStatusCode.NotFound) { }
}

public class UserWrongPasswordException : ProjectException
{
    public UserWrongPasswordException() : base($"Wprowadzone hasło jest nieprawidłowe.") { }
}

public class UserEmailAlreadyExistException : ProjectException
{
    public UserEmailAlreadyExistException(string email) : base($"Konto o adresie mailowym {email} już istnieje.") { }
}

public class UserNameAlreadyExistException : ProjectException
{
    public UserNameAlreadyExistException(string username) : base($"Nazwa {username} jest już zajęta.") { }
}

public class UserIdNotFoundException : ProjectException
{
    public UserIdNotFoundException() : base($"Nieprawidłowe Id użytkownika.", HttpStatusCode.NotFound) { }
}