using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Infrastructure.Database;
using AppointmentSchedulingApp.Infrastructure.UnitOfWork;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AppointmentSchedulingApp.Application.Services
{
    public class PatientService : IPatientService
    {
        private readonly IMapper mapper;
        public IUnitOfWork unitOfWork { get; set; }
        private readonly ILogger<PatientService> logger;

        public PatientService(IMapper mapper, IUnitOfWork unitOfWork, ILogger<PatientService> logger)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.logger = logger;
            this.logger = logger;
        }

        //public async Task<List<PatientDTO>> GetPatientList()
        //{
        //    var patients = await unitOfWork.PatientRepository.GetAll();
        //    return mapper.Map<List<PatientDTO>>(patients);
        //}

        //public async Task<PatientDetailDTO> GetPatientDetailById(int patientId)
        //{
        //    var patient = await unitOfWork.PatientRepository.Get(p => p.PatientId.Equals(patientId));

        //    if (patient == null)
        //    {
        //        return null;
        //    }

        //    return mapper.Map<PatientDetailDTO>(patient);
        //}


        public async Task<List<PatientDTO>> GetPatientList()
        {
            try
            {
                var patients = await unitOfWork.PatientRepository.GetAll();
                return mapper.Map<List<PatientDTO>>(patients);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while fetching patient list.");
                throw;
            }
        }

        public async Task<PatientDetailDTO> GetPatientDetailById(int patientId)
        {
            try
            {
                var patient = await unitOfWork.PatientRepository.Get(p => p.PatientId.Equals(patientId));

                if (patient == null)
                {
                    return null;
                }

                return mapper.Map<PatientDetailDTO>(patient);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while fetching patient details for ID={patientId}", patientId);
                throw;
            }
        }
    }
}
