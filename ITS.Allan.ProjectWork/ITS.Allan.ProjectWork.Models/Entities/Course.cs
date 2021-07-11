using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ITS.Allan.ProjectWork.Models.Entities
{
    public class Course
    {
        [Key]
        public int IdCourse { get; set; }

        [ForeignKey("IdCampus")]
        public int IdCampus { get; set; }

        [Required(ErrorMessage = "Course's name cannot be null")]
        [StringLength(50, ErrorMessage = "Course's name cannot be longer than 50 characters")]
        public string CourseName { get; set; }

        [Required(ErrorMessage = "Course's duration cannot be null")]
        public int CourseDuration { get; set; }
    }
}
