using ITS.Allan.ProjectWork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Data
{
    public interface ILessonRepository
    {
        Task SendCloudToDeviceMessageAsync(Lesson l);
    }
}
