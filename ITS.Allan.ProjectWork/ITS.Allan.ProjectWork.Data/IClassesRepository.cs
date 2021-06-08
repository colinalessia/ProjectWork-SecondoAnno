using ITS.Allan.ProjectWork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Data
{
    public interface IClassesRepository
    {
        IEnumerable<Class> GetAll();

        Class GetById(int classId);

        void Insert(Class _class);

        void Update(Class _class);

        void Delete(int classId);
    }
}
