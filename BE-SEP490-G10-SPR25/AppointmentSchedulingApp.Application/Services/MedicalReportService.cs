using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;

using AppointmentSchedulingApp.Domain.UnitOfWork;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Services
{
    public class MedicalReportService : IMedicalReportService

    {
        public readonly IMapper mapper;

        public IUnitOfWork unitOfWork { get; set; }
        public MedicalReportService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        public async Task<MedicalReportDTO> GetMedicalReportByPatientId(int patientId)
        {
            var patient =await unitOfWork.UserRepository.Get(p => p.UserId.Equals(patientId));
            return mapper.Map<MedicalReportDTO>(patient);
        }
    }
}
