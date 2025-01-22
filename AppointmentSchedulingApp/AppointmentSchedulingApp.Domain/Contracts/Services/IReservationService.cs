using AppointmentSchedulingApp.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.Contracts.Services
{
    public interface IReservationService
    {
        Task<List<ReservationDTO>> GetListReservation();
    }
}
