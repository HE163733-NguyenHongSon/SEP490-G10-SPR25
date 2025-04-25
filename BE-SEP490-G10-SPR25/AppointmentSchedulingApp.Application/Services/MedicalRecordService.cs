using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using AppointmentSchedulingApp.Domain.Entities;
using System.ComponentModel.DataAnnotations;

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

        // New methods implementation
        public async Task<MedicalRecordDTO> CreateMedicalRecord(MedicalRecordCreateDTO medicalRecordDTO)
        {
            // Check if the reservation exists
            var reservation = await unitOfWork.ReservationRepository.Get(r => r.ReservationId == medicalRecordDTO.ReservationId);
            if (reservation == null)
            {
                throw new ValidationException("Lịch hẹn không tồn tại");
            }

            // Check if a medical record already exists for this reservation
            var existingRecord = await unitOfWork.MedicalRecordRepository.Get(mr => mr.ReservationId == medicalRecordDTO.ReservationId);
            if (existingRecord != null)
            {
                throw new ValidationException("Bệnh án đã tồn tại cho lịch hẹn này");
            }

            try
            {
                await unitOfWork.BeginTransactionAsync();

                // Create new medical record
                var newMedicalRecord = new MedicalRecord
                {
                    ReservationId = medicalRecordDTO.ReservationId,
                    Symptoms = medicalRecordDTO.Symptoms,
                    Diagnosis = medicalRecordDTO.Diagnosis,
                    TreatmentPlan = medicalRecordDTO.TreatmentPlan,
                    FollowUpDate = medicalRecordDTO.FollowUpDate,
                    Notes = medicalRecordDTO.Notes,
                    CreatedAt = DateTime.Now
                };

                unitOfWork.MedicalRecordRepository.Add(newMedicalRecord);

                // Update reservation status to Completed
                reservation.Status = "Hoàn thành";
                reservation.UpdatedDate = DateTime.Now;
                unitOfWork.ReservationRepository.Update(reservation);

                await unitOfWork.CommitAsync();
                await unitOfWork.CommitTransactionAsync();

                return mapper.Map<MedicalRecordDTO>(newMedicalRecord);
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                await unitOfWork.RollbackTransactionAsync();
                throw new Exception($"Lỗi khi tạo bệnh án: {ex.Message}", ex);
            }
        }

        public async Task<bool> CheckIfPatientHasPreviousMedicalRecords(int patientId)
        {
            var medicalRecords = await GetAllMedicalRecordByPatientId(patientId);
            return medicalRecords.Count > 0;
        }

        public async Task<List<MedicalRecordDTO>> GetPatientMedicalHistoryByPatientId(int patientId)
        {
            var medicalRecords = await GetAllMedicalRecordByPatientId(patientId);
            
            // Sort by date (most recent first)
            return medicalRecords.OrderByDescending(mr => DateTime.Parse(mr.AppointmentDate)).ToList();
        }
    }
}