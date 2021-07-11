using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Models.Entities
{
    public class MessageModel
    {
        public Lesson Lesson { get; set; }
        public string DeviceNameGateway { get; set; }
        public string DeviceNamePIC { get; set; }
    }
}
