using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITS.Allan.ProjectWork.Data
{
    public interface IRepository<TEntity, TKey>
    {
        IEnumerable<TEntity> GetAll();

        TEntity Get(TKey id);

        void Insert(TEntity entity);

        void Update(TEntity entity);

        void Delete(TKey id);

    }
}
