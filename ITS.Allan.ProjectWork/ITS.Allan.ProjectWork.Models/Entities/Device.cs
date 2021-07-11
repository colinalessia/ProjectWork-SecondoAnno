using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ITS.Allan.ProjectWork.Models.Entities
{
    public class Device
    {
        [Key]
        public int IdDevice { get; set; }

        [Required(ErrorMessage = "Device's brand cannot be null")]
        [StringLength(50, ErrorMessage = "Device's brand cannot be longer than 50 characters")]
        public string DeviceBrand { get; set; }

        [Required(ErrorMessage = "Device's model cannot be null")]
        [StringLength(50, ErrorMessage = "Device's model cannot be longer than 50 characters")]
        public string DeviceModel { get; set; }

        [Required(ErrorMessage = "Device's type cannot be null")]
        [StringLength(50, ErrorMessage = "Device's type cannot be longer than 50 characters")]
        public string DeviceType { get; set; }

        [StringLength(50, ErrorMessage = "Device's name cannot be longer than 50 characters")]
        public string DeviceName { get; set; }
    }
}
