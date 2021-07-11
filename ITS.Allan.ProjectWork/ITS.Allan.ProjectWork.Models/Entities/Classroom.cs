using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ITS.Allan.ProjectWork.Models.Entities
{
    public class Classroom
    {
        [Key]
        public int IdClassroom { get; set; }

        [ForeignKey("IdFloor")]
        public int IdFloor { get; set; }

        [ForeignKey("IdDevice")]
        public int IdDevice { get; set; }

        [StringLength(15, ErrorMessage = "Classroom's name cannot be longer than 50 characters")]
        public string ClassroomName { get; set; }
    }
}
