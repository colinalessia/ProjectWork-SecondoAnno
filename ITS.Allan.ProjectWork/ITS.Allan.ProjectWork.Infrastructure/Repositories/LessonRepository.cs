using ITS.Allan.ProjectWork.Models;
using ITS.Allan.ProjectWork.Models.Entities;
using Microsoft.Azure.Devices;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Device = ITS.Allan.ProjectWork.Models.Entities.Device;

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
            _targetDevice = configuration["DeviceId"] ?? "colin-device2";
            _serviceClient = ServiceClient.CreateFromConnectionString(_connectionString);
        }

        public async Task SendCloudToDeviceMessageAsync(Lesson lesson)
        {
            Classroom classroom = new Classroom();
            Floor floor = new Floor();
            Device device = new Device();
            Subject subject = new Subject();
            Teacher teacher = new Teacher();

            LessonGateway lessonGateway = new LessonGateway();

            using (var httpClient = new HttpClient())
            {
                using (var responseClassroom = await httpClient.GetAsync("https://localhost:5001/api/Classrooms/"+ lesson.IdClassroom))
                {
                    using (var responseSubject = await httpClient.GetAsync("https://localhost:5001/api/Subjects/" + lesson.IdSubject))
                    {
                        string apiResponseSubject = await responseSubject.Content.ReadAsStringAsync();
                        subject = JsonConvert.DeserializeObject<Subject>(apiResponseSubject);
                    }
                    using (var responseTeacher = await httpClient.GetAsync("https://localhost:5001/api/Teachers/" + lesson.IdTeacher))
                    {
                        string apiResponseTeacher = await responseTeacher.Content.ReadAsStringAsync();
                        teacher = JsonConvert.DeserializeObject<Teacher>(apiResponseTeacher);
                    }
                    string apiResponseClassroom = await responseClassroom.Content.ReadAsStringAsync();
                    classroom = JsonConvert.DeserializeObject<Classroom>(apiResponseClassroom);
                    using (var responseFloor = await httpClient.GetAsync("https://localhost:5001/api/Floors/" + classroom.IdFloor))
                    {
                        string apiResponseFloor = await responseFloor.Content.ReadAsStringAsync();
                        floor = JsonConvert.DeserializeObject<Floor>(apiResponseFloor);
                        using (var responseDevice = await httpClient.GetAsync("https://localhost:5001/api/Devices/" + floor.IdDevice))
                        {
                            string apiResponseDevice = await responseDevice.Content.ReadAsStringAsync();
                            device = JsonConvert.DeserializeObject<Device>(apiResponseDevice);
                        }
                    }

                }
            }
            lessonGateway.ClassroomName = classroom.ClassroomName;
            lessonGateway.SubjectName = subject.SubjectName;
            lessonGateway.TeacherName = teacher.FirstName + " " + teacher.LastName;
            lessonGateway.Duration = (lesson.EndTime - lesson.StartTime).Hours;

            var jsonMessage = System.Text.Json.JsonSerializer.Serialize(lessonGateway);
            var commandMessage = new Message(Encoding.ASCII.GetBytes(jsonMessage));
            await _serviceClient.SendAsync(device.DeviceName, commandMessage);
        }


    }
}

