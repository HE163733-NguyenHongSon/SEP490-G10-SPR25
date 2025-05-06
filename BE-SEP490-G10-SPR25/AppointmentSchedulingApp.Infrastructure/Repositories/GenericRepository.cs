using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;

namespace AppointmentSchedulingApp.Infrastructure
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly AppointmentSchedulingDbContext _dbContext;
        protected readonly DbSet<T> _entitySet;
        public GenericRepository(AppointmentSchedulingDbContext dbContext)
        {
            _dbContext = dbContext;
            _entitySet = _dbContext.Set<T>();

        }
        public void Add(T entity)
        {
            _dbContext.Add(entity);
            _dbContext.SaveChanges();

        }
        public async Task AddAsync(T entity)
        {
            await _entitySet.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }
        public async Task<bool> AnyAsync(Expression<Func<T, bool>> predicate)
        {
            return await _entitySet.AnyAsync(predicate);
        }
        public async Task<T> Get(Expression<Func<T, bool>> expression)
        {
            return await _entitySet.FirstOrDefaultAsync(expression);
        }
        public virtual IQueryable<T> GetQueryable()
        {
            return _entitySet.AsNoTracking().AsQueryable();
        }
        public virtual IQueryable<T> GetQueryable(Expression<Func<T, bool>> expression)
        {
            return _entitySet.Where(expression).AsNoTracking();
        }


        public async Task<IEnumerable<T>> GetAll()
        {
            return await _entitySet.ToListAsync();

        }

        public async Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> expression)
        {
            return await _entitySet.Where(expression).ToListAsync();
        }

        public void Remove(T entity)
        {
            _dbContext.Remove(entity);

        }


        public void Update(T entity)
        {
            _dbContext.Update(entity);
        }


    }
}