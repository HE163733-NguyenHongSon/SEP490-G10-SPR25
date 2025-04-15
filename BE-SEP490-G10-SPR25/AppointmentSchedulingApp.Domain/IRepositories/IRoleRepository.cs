using AppointmentSchedulingApp.Domain.Entities;
using System.Linq.Expressions;

namespace AppointmentSchedulingApp.Domain.IRepositories
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> GetAll();
        Task<Role> Get(Expression<Func<Role, bool>> expression);
        Task<Role> GetById(int id);
        Task AddAsync(Role entity);
        void Update(Role entity);
        void Remove(Role entity);
    }
} 