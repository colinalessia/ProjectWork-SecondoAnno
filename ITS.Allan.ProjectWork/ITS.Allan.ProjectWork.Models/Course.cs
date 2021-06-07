using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ITS.Allan.ProjectWork.Models
{
    public class Course
    {
        [Required(ErrorMessage = "Course's id cannot be null")]
        public int IdCourse { get; set; }

        [Required(ErrorMessage = "Campus's id cannot be null")]
        public int IdCampus { get; set; }

        [Required(ErrorMessage = "Course's name cannot be null")]
        [StringLength(50, ErrorMessage = "Course's name cannot be longer than 50 characters")]
        public string CourseName { get; set; }

        [Required(ErrorMessage = "Course's duration cannot be null")]
        public int CourseDuration { get; set; }
    }
}
