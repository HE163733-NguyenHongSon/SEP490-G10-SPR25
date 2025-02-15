using AppointmentSchedulingApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.Contracts.Repositories
{
    public interface IReservationRepository : IGenericRepository<Reservation>
    {
        public  Task<IQueryable<Reservation>> GetListReservationByStatus(string status);
    }
}
