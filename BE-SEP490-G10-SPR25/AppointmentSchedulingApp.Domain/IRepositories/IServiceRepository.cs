using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Domain.Entities;

namespace AppointmentSchedulingApp.Domain.IRepositories
{
    public interface IServiceRepository :IGenericRepository<Service>    
    {

        Task<IQueryable<Service>> GetServicesBySpecialty(int specialtyId);
    }
}
