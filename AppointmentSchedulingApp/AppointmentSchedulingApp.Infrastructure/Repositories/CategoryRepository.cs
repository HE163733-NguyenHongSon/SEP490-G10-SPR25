using AppointmentSchedulingApp.Domain.Contracts.Repositories;
using AppointmentSchedulingApp.Domain.Models;
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
