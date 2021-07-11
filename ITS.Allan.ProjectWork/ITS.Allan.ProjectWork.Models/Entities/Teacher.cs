using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Models.Entities
{
    public class Teacher
    {
        [Key]
        public int IdTeacher { get; set; }

        [Required(ErrorMessage = "Teacher's first name cannot be null")]
        [StringLength(50, ErrorMessage = "Teacher's first name cannot be longer than 50 characters")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Teacher's last name cannot be null")]
        [StringLength(50, ErrorMessage = "Teacher's last name cannot be longer than 50 characters")]
        public string  LastName { get; set; }
    }
}
