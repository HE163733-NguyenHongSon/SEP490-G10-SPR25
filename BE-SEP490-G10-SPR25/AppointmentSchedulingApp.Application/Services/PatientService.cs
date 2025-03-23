using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.UnitOfWork;
using AutoMapper;

namespace AppointmentSchedulingApp.Application.Services
{
    public class PatientService : IPatientService
    {
        private readonly IMapper mapper;
        public IUnitOfWork unitOfWork { get; set; }

        public PatientService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        //public async Task<List<ReservationDTO>> GetListReservation()
        //{
        //    var reservations = await unitOfWork.ReservationRepository.GetAll();
        //    return mapper.Map<List<ReservationDTO>>(reservations);
        //}

        public async Task<List<PatientInforDTO>> GetAllPatientInformationByReceptionist()
        {
            var patients = await unitOfWork.PatientRepository.GetAll();
            return mapper.Map<List<PatientInforDTO>>(reservations);
        }
    }
}
