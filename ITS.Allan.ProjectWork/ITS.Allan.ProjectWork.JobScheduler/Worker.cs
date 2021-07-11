using Hangfire;
using ITS.Allan.ProjectWork.Data.Interfaces.Services;
using ITS.Allan.ProjectWork.Infrastructure.Services;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace ITS.Allan.ProjectWork.JobScheduler
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IHangfireService _hangfireService;
        public static string SEND_SERVICE = "Send";

        public Worker(ILogger<Worker> logger, IHangfireService hangfireService)
        {
            _logger = logger;
            _hangfireService = hangfireService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            RecurringJob.AddOrUpdate(SEND_SERVICE, () =>
               _hangfireService.PrintLessons(), //this is my class that does the actual process
               Cron.Minutely()); //this is a simple class that reads an configuration CRON file
        }
    }
}
