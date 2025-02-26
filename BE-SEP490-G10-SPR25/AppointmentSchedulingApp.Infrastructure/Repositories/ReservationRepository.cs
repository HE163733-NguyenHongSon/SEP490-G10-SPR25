using AppointmentSchedulingApp.Domain.Repositories;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Infrastructure.Database;

namespace AppointmentSchedulingApp.Infrastructure.Repositories
{
    public class ReservationRepository : GenericRepository<Reservation>, IReservationRepository
    {
        public ReservationRepository(AppointmentSchedulingDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IQueryable<Reservation>> GetListReservationByStatus(string status)
        {
            return base._entitySet.Where(r => r.Status.Equals(status));
        }


    }
}