using AppointmentSchedulingApp.Domain.Repositories;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Infrastructure.Database;

namespace AppointmentSchedulingApp.Infrastructure.Repositories
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly AppointmentSchedulingDbContext _dbContext;

        public ServiceRepository(AppointmentSchedulingDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IQueryable<Service>> GetAll()
        {
            return _dbContext.Services.AsQueryable();
        }

        public async Task<Service> GetById(int id)
        {
            return await _dbContext.Services.FindAsync(id);
        }

        public async Task Add(Service service)
        {
            await _dbContext.Services.AddAsync(service);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(Service service)
        {
            _dbContext.Services.Update(service);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var service = await _dbContext.Services.FindAsync(id);
            if (service != null)
            {
                _dbContext.Services.Remove(service);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<IQueryable<Service>> GetServicesBySpecialty(int specialtyId)
        {
            return _dbContext.Services.Where(s => s.SpecialtyId == specialtyId).AsQueryable();
        }
    }
}
