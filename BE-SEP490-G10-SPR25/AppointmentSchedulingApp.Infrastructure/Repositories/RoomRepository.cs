using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Infrastructure.Database;

namespace AppointmentSchedulingApp.Infrastructure.Repositories
{
    public class RoomRepository : GenericRepository<Room>, IRoomRepository
    {
        public RoomRepository(AppointmentSchedulingDbContext dbContext) : base(dbContext)
        {
        }
    }
}
