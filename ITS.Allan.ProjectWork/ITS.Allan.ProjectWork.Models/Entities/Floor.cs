using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ITS.Allan.ProjectWork.Models.Entities
{
    //model for Floor table
    public class Floor
    {
        [Key]
        public int IdFloor { get; set; }

        [ForeignKey("IdBuilding")]
        public int IdBuilding { get; set; }

        [ForeignKey("IdDevice")]
        public int IdDevice { get; set; }

        [Required(ErrorMessage = "Floor's name cannot be null")]
        [StringLength(50, ErrorMessage = "Floor's name cannot be longer than 50 characters")]
        public string FloorName { get; set; }

    }
}
