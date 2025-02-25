using AppointmentSchedulingApp.Domain.Contracts.Repositories;
using AppointmentSchedulingApp.Domain.Contracts.Services;
using AppointmentSchedulingApp.Domain.Contracts.UnitOfWork;
using AppointmentSchedulingApp.Domain.DTOs;
using AppointmentSchedulingApp.Domain.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AppointmentSchedulingApp.Services.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IMapper mapper;
        public IUnitOfWork unitOfWork { get; set; }

        public ReservationService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        public async Task<List<ReservationDTO>> GetListReservation()
        {
            var reservations = await unitOfWork.ReservationRepository.GetAll();
            return mapper.Map<List<ReservationDTO>>(reservations);
        }

        public async Task<List<ReservationDTO>> GetListReservationByStatusAndSort(string status, string sortBy)
        {
            var queryable = await unitOfWork.ReservationRepository.GetListReservationByStatus(status);

            queryable = sortBy switch
            {
                "recent_appointment" => queryable.OrderByDescending(r => r.AppointmentDate),
                "past_appointment" => queryable.OrderBy(r => r.AppointmentDate),
                "price_asc" => queryable.OrderBy(r => r.DoctorSchedule.Service.Price),
                _ => queryable.OrderByDescending(r => r.DoctorSchedule.Service.Price),
            };

            return mapper.Map<List<ReservationDTO>>(await queryable.ToListAsync());
        }
    }
}
