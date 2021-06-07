﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ITS.Allan.ProjectWork.Models
{
    public class Classroom
    {
        [Key]
        public int IdClassroom { get; set; }

        [ForeignKey("Floor")]
        public int IdFloor { get; set; }

        [ForeignKey("Device")]
        public int IdDevice { get; set; }

        [Required(ErrorMessage = "Classroom's name cannot be null")]
        [StringLength(50, ErrorMessage = "Classroom's name cannot be longer than 50 characters")]
        public string ClassroomName { get; set; }
    }
}
