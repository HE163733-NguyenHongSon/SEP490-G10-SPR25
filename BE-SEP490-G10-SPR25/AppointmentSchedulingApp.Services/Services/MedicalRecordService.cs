using AppointmentSchedulingApp.Domain.Contracts.Repositories;
using AppointmentSchedulingApp.Domain.Contracts.Services;
using AppointmentSchedulingApp.Domain.Contracts.UnitOfWork;
using AppointmentSchedulingApp.Domain.DTOs;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Services.Services
{
    public class MedicalRecordService : IMedicalRecordService
    {

        public readonly IMapper mapper;

        public IUnitOfWork unitOfWork { get; set; }
        public MedicalRecordService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }




        public async Task<List<MedicalRecordDTO>> GetMedicalRecordList()
        {
            return mapper.Map<List<MedicalRecordDTO>>(await unitOfWork.MedicalRecordRepository.GetAll());
        }
    }
}
