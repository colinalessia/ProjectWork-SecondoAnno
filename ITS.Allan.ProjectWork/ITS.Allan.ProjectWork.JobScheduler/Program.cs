using ITS.Allan.ProjectWork.Data;
using ITS.Allan.ProjectWork.Data.Interfaces.Services;
using ITS.Allan.ProjectWork.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using Hangfire;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ITS.Allan.ProjectWork.JobScheduler
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
                    services.AddHangfire(x => x.UseSqlServerStorage("Server=allansqlserver.database.windows.net;Database=UniBook;User Id=allan;Password=Vmware1!;"));
                    services.AddHangfireServer();
                    services.AddSingleton<IHangfireService, HangfireService>();
                    services.AddSingleton<ILessonRepository, LessonRepository>();
                });
    }
}
