using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ITS.Allan.ProjectWork.Models
{
    public class Classroom
    {
        [Required(ErrorMessage = "Classroom's id cannot be null")]
        public int IdClassroom { get; set; }

        [Required(ErrorMessage = "Floor's id cannot be null")]
        public int IdFloor { get; set; }

        [Required(ErrorMessage = "Device's id cannot be null")]
        public int IdDevice { get; set; }

        [Required(ErrorMessage = "Classroom's name cannot be null")]
        [StringLength(50, ErrorMessage = "Classroom's name cannot be longer than 50 characters")]
        public string ClassroomName { get; set; }
    }
}
