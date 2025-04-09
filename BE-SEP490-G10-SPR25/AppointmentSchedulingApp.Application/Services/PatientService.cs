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
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

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


        public async Task<List<PatientDTO>> GetPatientList()
        {
            try
            {
                var patients = await unitOfWork.UserRepository.GetAll();
                return mapper.Map<List<PatientDTO>>(patients);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<PatientDetailDTO> GetPatientDetailById(int patientId)
        {
            try
            {
                var patient = await unitOfWork.UserRepository.Get(p => p.UserId.Equals(patientId));

                if (patient == null)
                {
                    return null;
                }

                return mapper.Map<PatientDetailDTO>(patient);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        //public async Task<PatientDTO> UpdatePatientByReceptionist(PatientContactDTO dto)
        //{
        //    try
        //    {
        //        var patient = await unitOfWork.UserRepository.Get(p => p.UserId.Equals(dto.PatientId));
        //        if (patient == null)
        //        {
        //            return null;
        //        }

        //        //mapper.Map(patientDTO, patient);
        //        //unitOfWork.UserRepository.Update(patient);
        //        //return mapper.Map<PatientDTO>(patient);


        //        //patient.UserId = patient.UserId;
        //        //patient.FullName = patient.FullName;
        //        return null;

        //    }
        //    catch (Exception ex)
        //    {
        //        throw;
        //    }

        //}

        public async Task<PatientDTO> UpdatePatientContact(PatientContactDTO patientContactDTO)
        {
            try
            {
                var patient = await unitOfWork.UserRepository.Get(p => p.UserId.Equals(patientContactDTO.UserId));

                if (patient == null)
                {
                    return null;
                }

                mapper.Map(patientContactDTO, patient);
                unitOfWork.UserRepository.Update(patient);
                unitOfWork.CommitAsync();
                return mapper.Map<PatientDTO>(patient);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<PatientDTO> UpdateGuardianOfPatientContact(GuardianOfPatientDTO guardianOfPatientDTO)
        {
            try
            {
                var patient = await unitOfWork.PatientRepository.Get(p => p.PatientId.Equals(guardianOfPatientDTO.PatientId));
                if (patient == null)
                {
                    return null;
                }

                mapper.Map(guardianOfPatientDTO, patient);
                unitOfWork.PatientRepository.Update(patient);
                unitOfWork.CommitAsync();


                return mapper.Map<PatientDTO>(patient);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

    }
}
