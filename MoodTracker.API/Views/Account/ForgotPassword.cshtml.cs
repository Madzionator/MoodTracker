using FluentValidation;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MoodTracker.API.DTO;

namespace MoodTracker.API.Views.Account
{
    public class ForgotPasswordModel
    {
        public string EmailAddress { get; set; }
    }

    public class ForgotPasswordModelValidator : AbstractValidator<ForgotPasswordModel>
    {
        public ForgotPasswordModelValidator()
        {
            RuleFor(x => x.EmailAddress).EmailAddress();
        }
    }

}
