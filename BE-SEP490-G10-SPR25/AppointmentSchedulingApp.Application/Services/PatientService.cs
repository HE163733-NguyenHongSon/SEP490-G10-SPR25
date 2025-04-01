﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.UnitOfWork;
using AppointmentSchedulingApp.Infrastructure.Database;
using AppointmentSchedulingApp.Infrastructure.UnitOfWork;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AppointmentSchedulingApp.Application.Services
{
    public class PatientService : IPatientService
    {
        private readonly IMapper _mapper;
        public IUnitOfWork _unitOfWork { get; set; }
        private readonly AppointmentSchedulingDbContext _dbcontext;

        public PatientService(IMapper mapper, IUnitOfWork unitOfWork, AppointmentSchedulingDbContext dbcontext)
        {
            this._mapper = mapper;
            this._unitOfWork = unitOfWork;
            this._dbcontext = dbcontext;
        }

        //public async Task<List<PatientDTO>> GetPatientList()
        //{
        //    var patients = await _unitOfWork.PatientRepository.GetAll();
        //    return _mapper.Map<List<PatientDTO>>(patients);
        //}
        public async Task<List<PatientDTO>> GetPatientList()
        {
            var patients = await _dbcontext.Patients
                .Include(p => p.PatientNavigation)
                .Select(p => new PatientDTO()
                {
                    PatientId = p.PatientId,
                    GuardianId = p.GuardianId,
                    Rank = p.Rank,
                    UserId = p.PatientNavigation.UserId,    
                    CitizenId = p.PatientNavigation.CitizenId,
                    Email = p.PatientNavigation.Email,
                    UserName = p.PatientNavigation.UserName,
                    Phone = p.PatientNavigation.Phone,
                    Gender = p.PatientNavigation.Gender,
                    Dob = p.PatientNavigation.Dob,
                    Address = p.PatientNavigation.Address,
                    AvatarUrl = p.PatientNavigation.AvatarUrl,
                })
                .ToListAsync();
            return patients;
        }

        public async Task<PatientDTO> GetPatientDetailById(int patientId)
        {
            var patient = await _dbcontext.Patients
                .Include(p => p.PatientNavigation)
                .Where(p => p.PatientId == patientId)
                .Select(p => new PatientDTO()
                {
                    PatientId = p.PatientId,
                    GuardianId = p.GuardianId,
                    Rank = p.Rank,
                    UserId = p.PatientNavigation.UserId,
                    CitizenId = p.PatientNavigation.CitizenId,
                    Email = p.PatientNavigation.Email,
                    UserName = p.PatientNavigation.UserName,
                    Phone = p.PatientNavigation.Phone,
                    Gender = p.PatientNavigation.Gender,
                    Dob = p.PatientNavigation.Dob,
                    Address = p.PatientNavigation.Address,
                    AvatarUrl = p.PatientNavigation.AvatarUrl,
                })
                .FirstOrDefaultAsync();
            return patient;
        }

        public async Task<bool> UpdatePatient(PatientDTO patientDTO, StringBuilder message)
        {
            try
            {
                var patient = await _dbcontext.Patients
                    .Include(p => p.PatientNavigation)
                    .Where(p => p.PatientId == patientDTO.PatientId)
                    .FirstOrDefaultAsync();

                if (patient == null)
                {
                    message.Append("Bệnh nhân không tồn tại!");
                    return false;
                }

                patient.GuardianId = patientDTO.GuardianId;
                //message.Append("Cập nhật thông tin bệnh nhân thành công!");
                return true;
            }
            catch
            {
                message.Append("Đã xảy ra lỗi trong quá trình xử lý!");
                return true;
            }
        }

    }
}
