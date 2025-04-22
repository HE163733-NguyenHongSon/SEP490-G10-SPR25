using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IReservationService
    {
        Task<List<ReservationDTO>> GetListReservation();
        public Task<List<ReservationDTO>> GetListReservationByFilter(int patientId,string status, string sortBy);

        Task<bool> UpdateReservationStatus(ReservationStatusDTO reservationStatusDTO);
        Task<bool> AddReservation(AddedReservationDTO reservationDTO);

        Task<ReservationDTO> GetReservationById(int reservationId);
        Task<ReservationStatusDTO> ViewCancellationReason(int reservationId);

        Task<List<ReservationDTO>> GetActiveReservationsForThisWeek();

    }
}
