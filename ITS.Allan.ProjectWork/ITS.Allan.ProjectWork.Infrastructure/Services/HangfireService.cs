using ITS.Allan.ProjectWork.Data;
using ITS.Allan.ProjectWork.Data.Interfaces.Services;
using ITS.Allan.ProjectWork.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Infrastructure.Services
{
    public class HangfireService : IHangfireService
    {
        private readonly ILessonRepository _lessonRepository;

        public HangfireService(ILessonRepository lessonRepository)
        {
            _lessonRepository = lessonRepository;
        }

        public async Task PrintLessons()
        {
            List<Lesson> lessons = new List<Lesson>();
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync("https://localhost:5001/api/Lessons/jobs"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    lessons = JsonConvert.DeserializeObject<List<Lesson>>(apiResponse);
                }
            }



            foreach (var lesson in lessons)
            {
               await _lessonRepository.SendCloudToDeviceMessageAsync(lesson);
            }
        }
    }
}
