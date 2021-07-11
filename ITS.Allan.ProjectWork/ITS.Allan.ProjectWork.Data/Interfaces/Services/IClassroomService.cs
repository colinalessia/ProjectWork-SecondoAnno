using ITS.Allan.ProjectWork.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Data.Interfaces.Services
{
    public interface IClassroomService
    {
        Task<IEnumerable<Classroom>> GetClassrooms();
    }
}
