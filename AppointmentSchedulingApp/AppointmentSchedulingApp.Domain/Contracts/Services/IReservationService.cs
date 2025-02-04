using AppointmentSchedulingApp.Domain.DTOs;
using AppointmentSchedulingApp.Domain.Models;
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
        public Task<List<ReservationDTO>> GetListReservationByFilterAndSort(string status , string sortBy , int pageIndex );
    }
}
