using AppointmentSchedulingApp.Domain.Contracts.Repositories;
using AppointmentSchedulingApp.Domain.Models;
using System.Linq.Expressions;

namespace AppointmentSchedulingApp.Infrastructure
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(AppointmentSchedulingDbContext dbContext) : base(dbContext)
        {
        }

        public Task<Category> Get(Expression<Func<Category, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Category>> GetAll(Expression<Func<Category, bool>> expression)
        {
            throw new NotImplementedException();
        }
    }
}
