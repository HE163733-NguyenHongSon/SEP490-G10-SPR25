using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Castle.Components.DictionaryAdapter.Xml;
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

        public async Task<Reservation> AddReservation(AddedReservationDTO reservationDTO)
        {
            var reservation = mapper.Map<Reservation>(reservationDTO);


            await unitOfWork.ReservationRepository.AddAsync(reservation);

            await unitOfWork.CommitAsync();

            return reservation;
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
