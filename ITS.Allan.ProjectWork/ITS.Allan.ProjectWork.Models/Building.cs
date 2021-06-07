using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ITS.Allan.ProjectWork.Models
{
    //model for Building table
    public class Building
    {
        [Key]
        public int IdBuilding { get; set; }

        [ForeignKey("IdCampus")]
        public int IdCampus { get; set; }

    }
}
