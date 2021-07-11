using ITS.Allan.ProjectWork.Data;
using ITS.Allan.ProjectWork.Data.Interfaces.Services;
using ITS.Allan.ProjectWork.Infrastructure;
using ITS.Allan.ProjectWork.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.EmailService
{
    public class Program
    { 
    
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddHostedService<Worker>();

                    services.AddSingleton<IServiceBusService, ServiceBusService>();
                    services.AddSingleton<IMailService, MailService>();
                    
                });
    }
}
