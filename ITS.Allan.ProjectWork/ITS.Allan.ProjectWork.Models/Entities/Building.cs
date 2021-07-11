using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ITS.Allan.ProjectWork.Models.Entities
{
    //model for Building table
    public class Building
    {
        [Key]
        public int IdBuilding { get; set; }

        [ForeignKey("IdCampus")]
        public int IdCampus { get; set; }

        [Required(ErrorMessage = "Building's name cannot be null")]
        [StringLength(15, ErrorMessage = "Building's name cannot be longer than 15 characters")]
        public string BuildingName { get; set; }

    }
}
