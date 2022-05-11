using FluentValidation;

namespace MoodTracker.API.DTO;

public class UserInfoDto
{
    public string UserName { get; set; }
    public string Bio { get; set; }
    public bool IsPrivate { get; set; }
}


public class UserEditDto
{
    public string Bio { get; set; }
    public bool? IsPrivate { get; set; }
}

public class UserRegDto
{
    public string UserName { get; set; }
    public string EmailAddress { get; set; }
    public string Password { get; set; }
    public string Bio { get; set; }
}

public class UserLoginDto
{
    public string Login { get; set; }
    public string Password { get; set; }
}

public class UserEditDtoValidator : AbstractValidator<UserEditDto>
{
    public UserEditDtoValidator()
    {
        RuleFor(user => user.Bio).MaximumLength(512);
    }
}

public class UserRegDtoValidator : AbstractValidator<UserRegDto>
{
    private const string rule = @"^[a-zA-Z0-9_\-\.]+$";
    public UserRegDtoValidator()
    {
        RuleFor(user => user.UserName).MinimumLength(4).MaximumLength(64).NotEmpty()
            .Matches(rule).WithMessage("Dozwolone litery, cyfry oraz znaki: _ - .");
        RuleFor(user => user.EmailAddress).EmailAddress().NotEmpty();
        RuleFor(user => user.Password).MaximumLength(128).MinimumLength(8).NotEmpty();
        RuleFor(user => user.Bio).MaximumLength(512);
    }
}