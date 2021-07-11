using ITS.Allan.ProjectWork.Data;
using ITS.Allan.ProjectWork.Data.Interfaces.Services;
using ITS.Allan.ProjectWork.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Infrastructure.Services
{
    public class ClassroomService : IClassroomService
    {
        private readonly IClassroomRepository _classroomRepository;

        public ClassroomService(IClassroomRepository classroomRepository)
        {
            _classroomRepository = classroomRepository;
        }
        public async Task<IEnumerable<Classroom>> GetClassrooms()
        {
            return await _classroomRepository.GetClassrooms();
        }
    }


}
