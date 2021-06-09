using ITS.Allan.ProjectWork.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace ITS.Allan.ProjectWork.Data
{
    public class UniBookContext: DbContext
    {
        public UniBookContext(DbContextOptions<UniBookContext> options)
            : base(options)
        {

        }

        public DbSet<Class> Classes { get; set; }
        public DbSet<Course> Courses { get; set; }
    }
}
