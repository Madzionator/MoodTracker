using System.Net.Mail;

namespace MoodTracker.API.Interfaces;

public interface IMailer
{
    void SendMail(MailMessage message);
}