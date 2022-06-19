using FluentValidation;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MoodTracker.API.DTO;

namespace MoodTracker.API.Views.Account
{
    public class ChangePasswordModel
    {
        public string Password { get; set; }
        public string RepeatPassword { get; set; }
        public string Token { get; set; }
    }

    public class ChangePasswordModelValidator : AbstractValidator<ChangePasswordModel>
    {
        public ChangePasswordModelValidator()
        {
            RuleFor(x => x.Password)
                .MaximumLength(128)
                .MinimumLength(8)
                .NotEmpty();

            RuleFor(x => x.RepeatPassword)
                .Equal(p => p.Password);
        }
    }

}
