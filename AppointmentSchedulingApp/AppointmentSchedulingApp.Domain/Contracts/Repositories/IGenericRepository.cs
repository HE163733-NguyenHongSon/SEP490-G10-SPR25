using System.Linq.Expressions;

namespace AppointmentSchedulingApp.Domain.Contracts.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> Get(Expression<Func<T, bool>> expression);
        Task<IEnumerable<T>> GetAll();
        Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> expression);
        void Add(T entity); 
        void Update(T entity); 
        void Remove(T entity);
    }
}
