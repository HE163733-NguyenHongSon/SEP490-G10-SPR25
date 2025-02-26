using AppointmentSchedulingApp.Domain.Repositories;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Infrastructure.Database;
using System.Linq.Expressions;

namespace AppointmentSchedulingApp.Infrastructure.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(AppointmentSchedulingDbContext dbContext) : base(dbContext)
        {
        }

        
    }
}
