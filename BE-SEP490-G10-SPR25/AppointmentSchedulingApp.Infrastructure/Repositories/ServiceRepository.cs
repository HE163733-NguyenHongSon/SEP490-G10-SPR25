using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Infrastructure.Database;

namespace AppointmentSchedulingApp.Infrastructure.Repositories
{
    public class ServiceRepository :GenericRepository<Service>, IServiceRepository
    {
        private readonly AppointmentSchedulingDbContext _dbContext;

        public ServiceRepository(AppointmentSchedulingDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IQueryable<Service>> GetServicesBySpecialty(int specialtyId)
        {
            return _dbContext.Services.Where(s => s.SpecialtyId == specialtyId).AsQueryable();
        }
    }
}
