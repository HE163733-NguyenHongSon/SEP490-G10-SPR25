using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace AppointmentSchedulingApp.Infrastructure.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly AppointmentSchedulingDbContext _context;
        private readonly DbSet<Role> _dbSet;

        public RoleRepository(AppointmentSchedulingDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<Role>();
        }

        public async Task<IEnumerable<Role>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<Role> Get(Expression<Func<Role, bool>> expression)
        {
            return await _dbSet.FirstOrDefaultAsync(expression);
        }

        public async Task<Role> GetById(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task AddAsync(Role entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Update(Role entity)
        {
            _dbSet.Update(entity);
        }

        public void Remove(Role entity)
        {
            _dbSet.Remove(entity);
        }
    }
} 