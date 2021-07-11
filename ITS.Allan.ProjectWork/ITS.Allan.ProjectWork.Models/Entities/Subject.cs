using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Models.Entities
{
    public class Subject
    {
        [Key]
        public int IdSubject { get; set; }

        [Required(ErrorMessage = "Subject's subject name cannot be null")]
        [StringLength(50, ErrorMessage = "Subject's subject name cannot be longer than 50 characters")]
        public string SubjectName { get; set; }
    }
}
