using NotesApp.Domain.Twilio;
using NotesApp.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using System;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using Twilio;
using Twilio.Clients;

namespace NotesApp
{
    public class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            // Plug in your email service here to send an email.
            //return Task.FromResult(0);    
            var mess = new MailMessage();
            mess.To.Add(new MailAddress(message.Destination));  // replace with valid value 
            mess.From = new MailAddress("notesapp@gmail.com");  // replace with valid value
            mess.Subject = message.Subject;
            mess.Body = string.Format(message.Body, message.Destination, mess.From);
            mess.IsBodyHtml = true;

            using (var smtp = new SmtpClient())
            {
                var credential = new NetworkCredential
                {
                    UserName = "notesapp@gmail.com",  // replace with valid value
                    Password = "P@ssW0rd"  // replace with valid value
                };
                smtp.Credentials = credential;
                smtp.Host = "smtp.gmail.com	";
                smtp.Port = 587;
                smtp.EnableSsl = true;
                smtp.Send(mess);

            }
            return Task.FromResult(0);
        }
    }

    public class SmsService : IIdentityMessageService
    {
        private readonly ITwilioMessageSender _messageSender;

        public SmsService() : this(new TwilioMessageSender()) { }

        public SmsService(ITwilioMessageSender messageSender)
        {
            _messageSender = messageSender;
        }

        public async Task SendAsync(IdentityMessage message)
        {
            await _messageSender.SendMessageAsync(message.Destination,
                                                  Config.TwilioNumber,
                                                  message.Body);
        }
    }

   

  
   
}
