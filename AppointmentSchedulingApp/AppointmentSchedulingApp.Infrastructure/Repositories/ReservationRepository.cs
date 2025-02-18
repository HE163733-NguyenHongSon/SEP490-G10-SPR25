using AppointmentSchedulingApp.Domain.Contracts.Repositories;
using AppointmentSchedulingApp.Domain.DTOs;
using AppointmentSchedulingApp.Domain.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
            return base._entitySet.Where(r => r.Status.Equals(status));
        }


    }
}