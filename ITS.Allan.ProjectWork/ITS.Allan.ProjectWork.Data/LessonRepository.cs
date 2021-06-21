using ITS.Allan.ProjectWork.Models;
using Microsoft.Azure.Devices;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Data
{
    public class LessonRepository : ILessonRepository
    {
        private readonly ServiceClient _serviceClient;
        private readonly string _connectionString;
        private readonly string _targetDevice;
        private readonly IConfiguration _configuration;

        public LessonRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("IotHub");
            _targetDevice = configuration["DeviceId"] ?? "colin-device1";
            _serviceClient = ServiceClient.CreateFromConnectionString(_connectionString);
        }

        public async Task SendCloudToDeviceMessageAsync(Lesson l)
        {
            var jsonMessage = JsonSerializer.Serialize(l);
            var commandMessage = new Message(Encoding.ASCII.GetBytes(jsonMessage));
            await _serviceClient.SendAsync(_targetDevice, commandMessage);
        }


    }
}

