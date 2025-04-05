using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.IRepositories
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> Get(Expression<Func<T, bool>> expression);
        Task<IEnumerable<T>> GetAll();
        Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> expression);
        Task AddAsync(T entity);
        void Add(T entity); 
        void Update(T entity); 
        void Remove(T entity);
    }
}
