using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Models.Entities
{
    public class User
    {
        [Key]
        public int IdUser { get; set; }

        [Required(ErrorMessage = "User's first name cannot be null")]
        [StringLength(50, ErrorMessage = "User's first name cannot be longer than 50 characters")]
        public string UserFirstName { get; set; }

        [Required(ErrorMessage = "User's last name cannot be null")]
        [StringLength(50, ErrorMessage = "User's last name cannot be longer than 50 characters")]
        public string UserLastName { get; set; }

        [Required(ErrorMessage = "User's email cannot be null")]
        [StringLength(50, ErrorMessage = "User's email cannot be longer than 50 characters")]
        public string UserEmail { get; set; }

        [Required(ErrorMessage = "User's password cannot be null")]
        [StringLength(50, ErrorMessage = "User's password cannot be longer than 50 characters")]
        public string UserPassword { get; set; }

        [Required(ErrorMessage = "User's role cannot be null")]
        [StringLength(15, ErrorMessage = "User's role cannot be longer than 15 characters")]
        public string UserRole { get; set; }
    }
}
