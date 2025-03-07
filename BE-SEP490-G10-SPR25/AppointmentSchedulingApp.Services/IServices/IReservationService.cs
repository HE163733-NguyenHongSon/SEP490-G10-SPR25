using AppointmentSchedulingApp.Services.DTOs;
using AppointmentSchedulingApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Services.IServices
{
    public interface IReservationService
    {
        Task<List<ReservationDTO>> GetListReservation();
        public Task<List<ReservationDTO>> GetListReservationByStatusAndSort(string status, string sortBy);
    }
}
