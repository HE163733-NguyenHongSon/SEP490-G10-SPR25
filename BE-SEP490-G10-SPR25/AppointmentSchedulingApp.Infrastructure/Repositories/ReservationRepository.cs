using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Infrastructure.Database;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Infrastructure.Repositories
{
    public class ReservationRepository : GenericRepository<Reservation>, IReservationRepository
    {
        public ReservationRepository(AppointmentSchedulingDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IQueryable<Reservation>> GetListReservationByStatus(string status)
        {
            return _entitySet.Where(r => r.Status.Equals(status));
        }
    }
}