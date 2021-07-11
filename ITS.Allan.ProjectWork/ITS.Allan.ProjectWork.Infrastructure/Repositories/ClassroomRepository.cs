using ITS.Allan.ProjectWork.Models;
using ITS.Allan.ProjectWork.Models.Entities;
using Microsoft.Azure.Devices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Data
{
    public class ClassroomRepository : IClassroomRepository
    {

        private readonly IConfiguration _configuration;
        private readonly UniBookContext _context;


        public ClassroomRepository(IConfiguration configuration, UniBookContext context)
        {
            _configuration = configuration;
            _context = context;

        }

        public async Task<IEnumerable<Classroom>> GetClassrooms()
        { 
            return await _context.Classrooms.ToListAsync();
        }


    }
}

