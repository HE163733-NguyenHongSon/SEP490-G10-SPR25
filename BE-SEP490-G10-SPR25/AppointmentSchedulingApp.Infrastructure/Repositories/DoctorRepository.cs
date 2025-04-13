using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Infrastructure.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AppointmentSchedulingApp.Infrastructure.Repositories
{
    public class DoctorRepository : GenericRepository<Doctor>, IDoctorRepository
    {
        public DoctorRepository(AppointmentSchedulingDbContext dbContext) : base(dbContext)
        {
        }
       
    }
}
