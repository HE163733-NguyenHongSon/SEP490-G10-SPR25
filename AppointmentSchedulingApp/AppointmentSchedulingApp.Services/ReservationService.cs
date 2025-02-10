using AppointmentSchedulingApp.Domain.Contracts.Repositories;
using AppointmentSchedulingApp.Domain.Contracts.Services;
using AppointmentSchedulingApp.Domain.DTOs;
using AppointmentSchedulingApp.Domain.Models;
using AppointmentSchedulingApp.Infrastructure.Repositories;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Services
{
    public class ReservationService : IReservationService

    {
        private readonly IMapper mapper;
        private IReservationRepository reservationRepository;

        public ReservationService(IMapper mapper, IReservationRepository reservationRepository)
        {
            this.mapper = mapper;
            this.reservationRepository = reservationRepository;
        }

        public async Task<List<ReservationDTO>> GetListReservation()
        {
            return mapper.Map<List<ReservationDTO>>(await reservationRepository.GetAll());
        }

        public async Task<List<ReservationDTO>> GetListReservationByStatusAndSort(string status, string sortBy)
        {
            IQueryable<Reservation> queryable = await reservationRepository.GetListReservationByStatus(status);

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
