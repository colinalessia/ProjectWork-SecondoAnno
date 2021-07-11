using System.ComponentModel.DataAnnotations;

namespace ITS.Allan.ProjectWork.Models.Entities
{
    //model for Campus table
    public class Campus
    {
        [Key]
        public int IdCampus { get; set; }

        [Required(ErrorMessage = "Campus's name cannot be null")]
        [StringLength(50, ErrorMessage = "Campus's name cannot be longer than 50 characters")]
        public string CampusName { get; set; }

        [Required(ErrorMessage = "Campus's street name cannot be null")]
        [StringLength(50, ErrorMessage = "Campus's street cannot be longer than 50 characters")]
        public string Street { get; set; }

        [Required(ErrorMessage = "Campus's street number cannot be null")]
        [StringLength(50, ErrorMessage = "Campus's name cannot be longer than 10 characters")]
        public string StreetNumber { get; set; }

        [Required(ErrorMessage = "Campus's city name cannot be null")]
        [StringLength(50, ErrorMessage = "Campus's name cannot be longer than 50 characters")]
        public string City { get; set; }

        [Required(ErrorMessage = "Campus's telephone number cannot be null")]
        [StringLength(50, ErrorMessage = "Campus's name cannot be longer than 15 characters")]
        public string TelephoneNumber { get; set; }
    }
}
