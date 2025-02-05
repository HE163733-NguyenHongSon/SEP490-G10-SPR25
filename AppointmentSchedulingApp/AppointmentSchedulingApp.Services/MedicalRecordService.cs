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
    public class MedicalRecordService : IMedicalRecordService
    {

        public readonly IMapper mapper;
        public readonly IMedicalRecordRepository medicalRecordRepository;

        public MedicalRecordService(IMapper mapper, IMedicalRecordRepository medicalRecordRepository)
        {
            this.mapper = mapper;
            this.medicalRecordRepository = medicalRecordRepository;
        }

        public async Task<List<MedicalRecordDTO>> GetMedicalRecordList()
        {
            return mapper.Map<List<MedicalRecordDTO>>(await medicalRecordRepository.GetAll());
        }
    }
}
