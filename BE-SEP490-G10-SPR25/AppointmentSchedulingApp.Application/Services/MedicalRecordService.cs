using AppointmentSchedulingApp.Domain.UnitOfWork;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AutoMapper;

namespace AppointmentSchedulingApp.Application.Services
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
