using AppointmentSchedulingApp.Domain.Contracts.Repositories;
using AppointmentSchedulingApp.Domain.Models;
using AppointmentSchedulingApp.Infrastructure.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Infrastructure.Repositories
{
    public class DoctorRepository : GenericRepository<Doctor>,IDoctorRepository
    {
        public DoctorRepository(AppointmentSchedulingDbContext dbContext) : base(dbContext)
        {
        }
    }
}
