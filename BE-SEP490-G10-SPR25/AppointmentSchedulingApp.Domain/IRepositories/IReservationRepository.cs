﻿using AppointmentSchedulingApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.Repositories
{
    public interface IReservationRepository : IGenericRepository<Reservation>
    {
        public  Task<IQueryable<Reservation>> GetListReservationByStatus(string status);
    }
}
