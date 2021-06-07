﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Models
{
    public class Class
    {
        public int IdClass { get; set; }
        public int IdTeacher { get; set; }
        public int IdSubject { get; set; }
        public int IdClassroom { get; set; }
        public int IdCourse { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}