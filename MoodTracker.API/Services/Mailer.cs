using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using MoodTracker.API.Database.Models;
using MoodTracker.API.Interfaces;

namespace MoodTracker.API.Services;

public class MailerOptions
{
    public string SenderName { get; set; }
    public string Server { get; set; }
    public int Port { get; set; }
    public bool EnableSsl { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
}


public sealed class Mailer : IMailer
{
    private readonly MailerOptions _options;

    public Mailer(MailerOptions options)
    {
        _options = options;
    }

    public void SendMail(MailMessage message)
    {
        var smtpClient = new SmtpClient(_options.Server, _options.Port)
        {
            EnableSsl = _options.EnableSsl,
            Credentials = new NetworkCredential(_options.Username, _options.Password),
        };

        //message.Sender = new MailAddress(_options.Username, _options.SenderName);
        message.From = new MailAddress(_options.Username, _options.SenderName);

        using (smtpClient)
        {
            smtpClient.Send(message);
        }
    }
}