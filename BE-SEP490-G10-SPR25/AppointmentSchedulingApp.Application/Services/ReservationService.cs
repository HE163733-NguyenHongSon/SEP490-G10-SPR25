using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AppointmentSchedulingApp.Application.Services
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

        public async Task<List<ReservationDTO>> GetListReservationByFilter(int patientId, string status, string sortBy)
        {
           
            var queryable = await unitOfWork.ReservationRepository.GetListReservationByPatientIdAndStatus(patientId, status);

            queryable = sortBy switch
            {
                "Cuộc hẹn gần đây" => queryable.OrderByDescending(r => r.AppointmentDate),
                "Cuộc hẹn đã qua" => queryable.OrderBy(r => r.AppointmentDate),
                "Giá dịch vụ tăng dần" => queryable.OrderBy(r => r.DoctorSchedule.Service.Price),
                _ => queryable.OrderByDescending(r => r.DoctorSchedule.Service.Price),
            };

            return mapper.Map<List<ReservationDTO>>(await queryable.ToListAsync());
        }
    }
}
