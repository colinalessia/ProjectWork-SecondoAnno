using ITS.Allan.ProjectWork.Data;
using ITS.Allan.ProjectWork.Data.Interfaces.Services;
using ITS.Allan.ProjectWork.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.EmailService
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IServiceBusService _serviceBusService;
        private readonly IMailService _emailService;

        public Worker(ILogger<Worker> logger, IServiceBusService serviceBusService, IMailService emailService)
        {
            _logger = logger;
            _serviceBusService = serviceBusService;
            _emailService = emailService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            List<Classroom> classrooms = new List<Classroom>();
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync("https://localhost:5001/api/Classrooms"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    classrooms = JsonConvert.DeserializeObject<List<Classroom>>(apiResponse);
                }
            }
            
            await _serviceBusService.StartReceiveMessagesFromSubscriptionAsync(
                IdDevice =>
                {
                    var classroomName = classrooms.Find(x => x.IdDevice.ToString().Contains(IdDevice.ToString())).ClassroomName;
                    _emailService.Send(classroomName);

                    //_logger.LogInformation("MESSAGE TYPE: {0}, TEXT: {1}", message.MessageType, message.MessageText);
                });

            while (!stoppingToken.IsCancellationRequested)
            {
                await Task.Delay(10000, stoppingToken);
            }
        }

        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            await _serviceBusService.StopReceiveMessagesFromSubscriptionAsync();
            await base.StopAsync(cancellationToken);
        }
    }
}
