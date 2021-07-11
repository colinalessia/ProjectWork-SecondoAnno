using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Models.Entities
{
    public class Lesson
    {
        [Key]
        public int IdLesson { get; set; }

        [ForeignKey("IdTeacher")]
        public int IdTeacher { get; set; }

        [ForeignKey("IdSubject")]
        public int IdSubject { get; set; }

        [ForeignKey("IdClassroom")]
        public int IdClassroom { get; set; }

        [ForeignKey("IdCourse")]
        public int IdCourse { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }
    }
}
