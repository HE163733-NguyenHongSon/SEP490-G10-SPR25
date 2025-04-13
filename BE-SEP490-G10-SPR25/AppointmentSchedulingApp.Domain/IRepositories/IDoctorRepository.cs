using AppointmentSchedulingApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.IRepositories
{
    public interface IDoctorRepository : IGenericRepository<Doctor>
    {
        new IQueryable<Doctor> GetQueryable();
        new IQueryable<Doctor> GetQueryable(Expression<Func<Doctor, bool>> expression);
    }
}
