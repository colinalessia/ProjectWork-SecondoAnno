using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Text;
using MailKit.Net.Smtp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ITS.Allan.ProjectWork.Data.Interfaces.Services;

namespace ITS.Allan.ProjectWork.Infrastructure.Services
{
    public class MailService : IMailService
    {
		private readonly IConfiguration _configuration;
		public string SmtpServer;
		public int SmtpPort;
		public string SmtpUsername;
		public string SmtpPassword;


		public MailService(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public void Send(string classroomName)
		{
			SmtpServer = _configuration["EmailConfiguration:SmtpServer"];
			SmtpPort = Convert.ToInt32(_configuration["EmailConfiguration:SmtpPort"]);
			SmtpUsername = _configuration["EmailConfiguration:SmtpUsername"];
			SmtpPassword = _configuration["EmailConfiguration:SmtpPassword"];

			var message = new MimeMessage();

			message.From.Add(new MailboxAddress(SmtpUsername));
			message.To.Add(new MailboxAddress(SmtpUsername));

			message.Subject = "Avviso";
			message.Body = new TextPart(TextFormat.Html)
			{
				Text = $"Antonio sei richiesto in aula: {classroomName}"
			};

			using (var client = new SmtpClient())
			{

				client.ServerCertificateValidationCallback = (s, c, h, e) => true;
				client.Connect(SmtpServer, SmtpPort, true);
				client.Authenticate(SmtpUsername, SmtpPassword);
				client.Send(message);
				client.Disconnect(true);
			}

		}
	}
}
