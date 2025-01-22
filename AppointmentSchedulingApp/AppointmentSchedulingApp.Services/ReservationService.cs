using AppointmentSchedulingApp.Domain.Contracts.Repositories;
using AppointmentSchedulingApp.Domain.Contracts.Services;
using AppointmentSchedulingApp.Domain.DTOs;
using AutoMapper;
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
            return mapper.Map<List<ReservationDTO>>(await reservationRepository.GetAll()) ;
        }
    }
}
