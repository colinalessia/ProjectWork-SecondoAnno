using Azure.Messaging.ServiceBus;
using ITS.Allan.ProjectWork.Data.Interfaces.Services;
using ITS.Allan.ProjectWork.Models.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Diagnostics;
using System.Text.Json;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Infrastructure
{
    public class ServiceBusService : IServiceBusService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        private readonly string _topicName;
        private readonly string _subscriptionName;

        public ServiceBusService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = configuration.GetConnectionString("ServiceBus");
            _topicName = configuration["TopicName"] ?? "message";
            _subscriptionName = configuration["SubscriptionName"] ?? "messageData";
        }


        ServiceBusProcessor processor;
        public async Task StartReceiveMessagesFromSubscriptionAsync(
                                        Action<int> processMessageFunc)
        {
            if (string.IsNullOrWhiteSpace(_subscriptionName))
                throw new ArgumentNullException("Parameter SubscriptionName cannot be null or empty");

            ServiceBusClient client = new ServiceBusClient(_connectionString);

            processor = client.CreateProcessor(_topicName, _subscriptionName, new ServiceBusProcessorOptions());
            processor.ProcessMessageAsync += async args =>
            {
                string body = args.Message.Body.ToString();
                var message = int.Parse(body);
                processMessageFunc.Invoke(message);
                await args.CompleteMessageAsync(args.Message);
            };
            processor.ProcessErrorAsync += ErrorHandler;
            await processor.StartProcessingAsync();
        }

        public async Task StopReceiveMessagesFromSubscriptionAsync()
        {
            if (processor != null)
                await processor.StopProcessingAsync();
        }

        static Task ErrorHandler(ProcessErrorEventArgs args)
        {
            Debug.WriteLine(args.Exception.ToString());
            return Task.CompletedTask;
        }

    }
}
