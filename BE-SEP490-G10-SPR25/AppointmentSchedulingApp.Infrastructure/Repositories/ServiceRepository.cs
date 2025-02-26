using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Domain.Contracts.Repositories;
using AppointmentSchedulingApp.Domain.Models;
using AppointmentSchedulingApp.Infrastructure.Database;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

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
    }
}
