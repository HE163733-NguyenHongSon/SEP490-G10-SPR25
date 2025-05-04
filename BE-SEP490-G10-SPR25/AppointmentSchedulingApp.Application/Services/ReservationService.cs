using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Castle.Components.DictionaryAdapter.Xml;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
        public async Task UpdatePriorExaminationImg(int reservationId, string fileName)
        {
            var reservation = await unitOfWork.ReservationRepository.Get(r => r.ReservationId == reservationId);
            if (reservation == null)
            {
                throw new Exception($"Reservation with ID {reservationId} not found.");
            }

            reservation.PriorExaminationImg = fileName;

            unitOfWork.ReservationRepository.Update(reservation);
            await unitOfWork.CommitAsync();
        }

        public async Task<List<ReservationDTO>> GetListReservation()
        {
            var query = unitOfWork.ReservationRepository.GetQueryable();

            return await query.ProjectTo<ReservationDTO>(mapper.ConfigurationProvider).ToListAsync();
        }


        public async Task<List<ReservationDTO>> GetListReservationByFilter(int patientId, string status, string sortBy)
        {
            var patient = await unitOfWork.PatientRepository.Get(p => p.PatientId.Equals(patientId));
            if (patient == null)
            {
                return null;
            }
            var queryable = unitOfWork.ReservationRepository.GetQueryable(r => r.PatientId.Equals(patientId) && r.Status.Equals(status));
            queryable = sortBy switch
            {
                "Cuộc hẹn gần đây" => queryable.OrderByDescending(r => r.AppointmentDate),
                "Cuộc hẹn đã qua" => queryable.OrderBy(r => r.AppointmentDate),
                "Giá dịch vụ tăng dần" => queryable.OrderBy(r => r.DoctorSchedule.Service.Price),
                _ => queryable.OrderByDescending(r => r.DoctorSchedule.Service.Price),
            };

            return await queryable.ProjectTo<ReservationDTO>(mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<bool> UpdateReservationStatus(ReservationStatusDTO reservationStatusDTO)
        {
            try
            {
                var reservation = await unitOfWork.ReservationRepository.Get(r => r.ReservationId.Equals(reservationStatusDTO.ReservationId));

                if (reservation == null)
                {
                    return false;
                }

                mapper.Map(reservationStatusDTO, reservation);
                unitOfWork.ReservationRepository.Update(reservation);
                await unitOfWork.CommitAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
        public async Task<bool> UpdateReservationStatusList(List<ReservationStatusDTO> reservationStatusDTOs)
        {
            foreach (var dto in reservationStatusDTOs)
            {
                var reservation = await unitOfWork.ReservationRepository.Get(r => r.ReservationId == dto.ReservationId);

                if (reservation == null)
                    continue;


                reservation.Status = dto.Status;

                unitOfWork.ReservationRepository.Update(reservation);
            }

            await unitOfWork.CommitAsync();
            return true;
        }

        public async Task<ReservationDTO> GetReservationById(int reservationId)
        {
            try
            {
                var reservation = await unitOfWork.ReservationRepository.Get(r => r.ReservationId.Equals(reservationId));

                if (reservation == null)
                {
                    return null;
                }

                return mapper.Map<ReservationDTO>(reservation);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<ReservationStatusDTO> ViewCancellationReason(int reservationId)
        {
            try
            {
                var reservation = await unitOfWork.ReservationRepository.Get(r => r.ReservationId.Equals(reservationId));

                if (reservation == null)
                {
                    return null;
                }

                return mapper.Map<ReservationStatusDTO>(reservation);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<ReservationDTO>> GetActiveReservationsForThisWeek()
        {
            var startOfWeek = DateTime.UtcNow.AddHours(7);
            var endOfWeek = startOfWeek.AddDays(7).AddMilliseconds(-1);

            var query = unitOfWork.ReservationRepository.GetQueryable(r => r.AppointmentDate >= startOfWeek && r.AppointmentDate <= endOfWeek
                                                                              && (r.Status == "Đang chờ" || r.Status == "Xác nhận"));
            return await query.ProjectTo<ReservationDTO>(mapper.ConfigurationProvider).ToListAsync();

        }


         public async Task<List<ReservationDTO>> GetUpcomingReservationsAndMarkReminded()
        {
            var now = DateTime.UtcNow.AddHours(7);

            var targetTimeStart = now.AddHours(5).AddMinutes(-10);
            var targetTimeEnd = now.AddHours(5).AddMinutes(10);
           
            var reservations = await unitOfWork.ReservationRepository
                .GetAll(r =>
                    r.AppointmentDate >= targetTimeStart &&
                    r.AppointmentDate <= targetTimeEnd &&
                     r.Status == "Xác nhận");

            if (reservations.Any())
            {
                foreach (var reservation in reservations)
                {
                    if (reservation.Status != "Đã nhắc")
                    {
                        reservation.Status = "Đã nhắc";
                        unitOfWork.ReservationRepository.Update(reservation);
                    }
                }

                await unitOfWork.CommitAsync();
            }

            return mapper.Map<List<ReservationDTO>>(reservations);
        }

        public async Task<bool> ReplaceDoctor(int reservationId, int doctorscheduleId)
        {
            try
            {
                var reservation = unitOfWork.ReservationRepository.Get(r => r.ReservationId.Equals(reservationId)).Result;

                if (reservation == null)
                {
                    return false;
                }

                reservation.DoctorScheduleId = doctorscheduleId;
                unitOfWork.ReservationRepository.Update(reservation);
                await unitOfWork.CommitAsync();
                return true;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
