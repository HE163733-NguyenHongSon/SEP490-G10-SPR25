using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Infrastructure.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace AppointmentSchedulingApp.Infrastructure.Repositories
{
    public class DoctorRepository : GenericRepository<Doctor>, IDoctorRepository
    {
        public DoctorRepository(AppointmentSchedulingDbContext dbContext) : base(dbContext)
        {
        }
        
        public override IQueryable<Doctor> GetQueryable()
        {
            return _entitySet
                .Include(d => d.DoctorNavigation)
                .Include(d => d.Specialties)
                .Include(d => d.Services)
                .Include(d => d.DoctorSchedules)
                    .ThenInclude(ds => ds.Reservations)
                .AsNoTracking()
                .AsQueryable();
        }
        
        public override IQueryable<Doctor> GetQueryable(Expression<Func<Doctor, bool>> expression)
        {
            return _entitySet
                .Where(expression)
                .Include(d => d.DoctorNavigation)
                .Include(d => d.Specialties)
                    .ThenInclude(s => s.Doctors)
                .Include(d => d.Services)
                .Include(d => d.DoctorSchedules)
                    .ThenInclude(ds => ds.Reservations)
                        .ThenInclude(r => r.Feedback)
                .Include(d => d.DoctorSchedules)
                    .ThenInclude(ds => ds.Service)
                .Include(d => d.DoctorSchedules)
                    .ThenInclude(ds => ds.Room)
                .Include(d => d.DoctorSchedules)
                    .ThenInclude(ds => ds.Slot)
                .AsNoTracking();
        }
    }
}
