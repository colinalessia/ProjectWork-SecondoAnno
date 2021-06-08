using ITS.Allan.ProjectWork.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Data
{
    public class ClassesRepository : IClassesRepository
    {
        private readonly UniBookContext _uniBookContext;
        public ClassesRepository(UniBookContext uniBookContext)
        {
            _uniBookContext = uniBookContext;
        }

        public void Delete(int id)
        {
            var c = new Class
            {
                IdClass = id
            };
            _uniBookContext.Entry(c).State = EntityState.Deleted;

            _uniBookContext.SaveChanges();
        }

        public Class Get(int id)
        {
            return _uniBookContext.Classes.FirstOrDefault(c => c.IdClass == id);
        }

        public IEnumerable<Class> GetAll()
        {
            return _uniBookContext.Classes
                        .OrderBy(c => c.IdClass)
                        .ToList();
        }

        public Class GetById(int classId)
        {
            return _uniBookContext.Classes.FirstOrDefault(c => c.IdClass == classId);
        }

        public void Insert(Class c)
        {
            _uniBookContext.Classes.Add(c);
            _uniBookContext.SaveChanges();
        }

        public void Update(Class c)
        {
            _uniBookContext.Update(c);
            _uniBookContext.SaveChanges();
        }
    }
}
