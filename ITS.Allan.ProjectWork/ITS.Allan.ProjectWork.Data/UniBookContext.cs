using ITS.Allan.ProjectWork.Models.Entities;
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

        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Building> Buildings { get; set; }
        public DbSet<Floor> Floors { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Device> Devices { get; set; }
    }
}
