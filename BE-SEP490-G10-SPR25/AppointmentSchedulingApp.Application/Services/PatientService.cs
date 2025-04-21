using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
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
        private readonly AppointmentSchedulingDbContext _dbcontext;

        public PatientService(IMapper mapper, IUnitOfWork unitOfWork, AppointmentSchedulingDbContext dbcontext)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            _dbcontext = dbcontext;
        }


        public async Task<List<PatientDTO>> GetPatientList()
        {
            try
            {
                var patients = await unitOfWork.UserRepository.GetAll(u => u.Roles.Any(r => r.RoleId.Equals(2)));
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
        public async Task<bool> UpdatePatientInfor(PatientUpdateDTO patientUpdateDTO)
        {
            try
            {
                var patient = await unitOfWork.UserRepository.Get(p => p.UserId.Equals(patientUpdateDTO.UserId));

                if (patient == null)
                {
                    return false;
                }

                mapper.Map(patientUpdateDTO, patient);
                unitOfWork.UserRepository.Update(patient);
                unitOfWork.CommitAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<bool> UpdateGuardianOfPatient(GuardianOfPatientDTO guardianOfPatientDTO)
        {
            try
            {
                var patient = await unitOfWork.PatientRepository.Get(p => p.PatientId.Equals(guardianOfPatientDTO.PatientId));
                if (patient == null)
                {
                    unitOfWork.PatientRepository.Add(mapper.Map<Patient>(guardianOfPatientDTO));
                    return true;
                }

                mapper.Map(guardianOfPatientDTO, patient);
                unitOfWork.PatientRepository.Update(patient);
                unitOfWork.CommitAsync();


                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<bool> UpdatePatientInFormation(PatientUpdateDTO patientUpdateDTO)
        {
            try
            {
                var patient = await _dbcontext.Users
                    .Where(p => p.UserId == patientUpdateDTO.UserId)
                    .FirstOrDefaultAsync();
                if (patient == null)
                {
                    return false;
                }

                patient.UserName = patientUpdateDTO.UserName;
                patient.Phone = patientUpdateDTO.Phone;
                patient.Gender = patientUpdateDTO.Gender;
                patient.Dob = patientUpdateDTO.Dob;
                patient.Address = patientUpdateDTO.Address;

                _dbcontext.Users.Update(patient);
                await _dbcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public async Task<PatientDTO> AddPatient(AddedPatientDTO patientDto)
        {
            try
            {
                var user = mapper.Map<User>(patientDto);

                await unitOfWork.UserRepository.AddAsync(user);
                await unitOfWork.CommitAsync();

                var patient = new Patient
                {
                    PatientId = user.UserId,
                    GuardianId = patientDto.GuardianId,
                    Relationship = patientDto.Relationship,
                };

                await unitOfWork.PatientRepository.AddAsync(patient);
                await unitOfWork.CommitAsync();

                user.Patient = patient;

                var result = mapper.Map<PatientDTO>(user);
                return result;
            }
            catch (Exception e)
            {
                await unitOfWork.RollbackAsync();
                Console.WriteLine("Lỗi khi thêm bệnh nhân: " + e.Message);
                return null;
            }
        }


    }
}
