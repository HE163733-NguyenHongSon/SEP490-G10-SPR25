﻿using AppointmentSchedulingApp.Application.DTOs;
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
            var patient = await unitOfWork.PatientRepository.Get(p => p.PatientId.Equals(patientId));
            if (patient == null)
            {
                return null;
            }
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
                unitOfWork.CommitAsync();
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
    }
}
