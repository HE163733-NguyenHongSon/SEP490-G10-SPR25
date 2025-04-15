using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

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

        public async Task<List<MedicalRecordDTO>> GetAllMedicalRecordByPatientId(int patientId)
        {
            var reservations = await unitOfWork.ReservationRepository
                .GetAll(r => r.PatientId == patientId);
                

            var reservationIds = reservations.Select(r => r.ReservationId).ToList();

            var medicalRecords = await unitOfWork.MedicalRecordRepository
                .GetAll(mr => reservationIds.Contains(mr.ReservationId));

            return mapper.Map<List<MedicalRecordDTO>>(medicalRecords);
        }
        public async Task<MedicalRecordDetailDTO> GetMedicalRecordDetailById(int Id)
        {
            var query = unitOfWork.MedicalRecordRepository.GetQueryable(mr=>mr.ReservationId.Equals(Id));
            return await query.ProjectTo<MedicalRecordDetailDTO>(mapper.ConfigurationProvider).FirstOrDefaultAsync();


        }

    }
}