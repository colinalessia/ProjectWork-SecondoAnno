﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ITS.Allan.ProjectWork.Models
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

    }
}