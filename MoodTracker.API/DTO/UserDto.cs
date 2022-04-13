using FluentValidation;

namespace MoodTracker.API.DTO;

public class UserDto
{
    public string? Bio { get; set; }
    public bool IsPrivate { get; set; }
}

public class UserRegDto
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

public class UserDtoValidator : AbstractValidator<UserDto>
{
    public UserDtoValidator()
    {
        RuleFor(user => user.Bio).MaximumLength(512);
    }
}

public class UserRegDtoValidator : AbstractValidator<UserRegDto>
{
    public UserRegDtoValidator()
    {
        RuleFor(user => user.UserName).MinimumLength(4).MaximumLength(64).NotEmpty().Must(x => !x.Contains('@'));
        RuleFor(user => user.EmailAddress).EmailAddress().NotEmpty();
        RuleFor(user => user.Password).MaximumLength(128).MinimumLength(8).NotEmpty();
    }
}