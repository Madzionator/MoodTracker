using System.Net.Mail;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoodTracker.API.Database;
using MoodTracker.API.DTO;
using MoodTracker.API.Interfaces;
using MoodTracker.API.Services;
using MoodTracker.API.Views.Account;

namespace MoodTracker.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly IMailer _mailer;
        private readonly DataContext _context;
        private readonly IHashService _hashService;
        private static Dictionary<string, int> _tokens = new();

        public AccountController(IMailer mailer, DataContext context, IHashService hashService)
        {
            _mailer = mailer;
            _context = context;
            _hashService = hashService;
        }

        [HttpGet("[action]")]
        public IActionResult ForgotPassword()
        {
            return View();
        }

        [HttpGet("[action]")]
        public IActionResult EmailSent()
        {
            return View();
        }

        [HttpGet("[action]")]
        public IActionResult WrongPage()
        {
            return View();
        }

        [HttpGet("ChangePassword/{token}")]
        public IActionResult ChangePassword([FromRoute] string token)
        {
            if(!_tokens.ContainsKey(token))
                return RedirectToAction("WrongPage");

            return View(new ChangePasswordModel
            {
                Token = token
            });
        }

        [HttpGet("[action]")]
        public IActionResult Chenged()
        {
            return View();
        }

        [HttpPost("[action]")]
        public IActionResult SendMail([FromForm] ForgotPasswordModel model)
        {
            //create reset token
            var token = Guid.NewGuid() + Guid.NewGuid().ToString();

            var user = _context.Users.FirstOrDefault(x => x.EmailAddress == model.EmailAddress);
            if (user == null)
                return BadRequest();

            _tokens.Add(token, user.Id);

            //var resetUrl = "http://localhost:5063/Account/ChangePassword";
            var resetUrl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}/Account/ChangePassword";

            //send mail with reset token
            _mailer.SendMail(new MailMessage()
            {
                Body = $"Zmień hasło wchodząc w link: {resetUrl}/{token}. Link jest jednorazowy. Mail wygenerowany automatycznie, nie odpowiadaj.",
                To = { $"{model.EmailAddress}" },
                Subject = "Reset hasła",
                IsBodyHtml = true
            });

            //show page "sent you an email"
            return RedirectToAction("EmailSent");
        }

        [HttpPost("[action]")]
        public IActionResult SetNewPassword([FromForm] ChangePasswordModel model)
        {
            //retrieve token
            if (_tokens.Remove(model.Token, out var userId))
            {
                var user = _context.Users.Find(userId);
                if (user is null)
                    return BadRequest();

                user.Password = _hashService.Hash(model.Password);
                _context.Users.Update(user);
                _context.SaveChanges();
            }

            return RedirectToAction("Chenged");
        }
    }
}
