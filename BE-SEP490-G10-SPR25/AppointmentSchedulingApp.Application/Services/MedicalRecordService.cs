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
                
            // Lấy danh sách bệnh nhân liên quan đến các lịch hẹn
            var patientIDs = reservations.Select(r => r.PatientId).Distinct().ToList();
            var patients = await unitOfWork.PatientRepository.GetAll(p => patientIDs.Contains(p.PatientId));
            
            // Lấy thông tin từ bảng Users
            var userIDs = patients.Select(p => p.PatientId).ToList();
            var users = await unitOfWork.UserRepository.GetAll(u => userIDs.Contains(u.UserId));

            var reservationIds = reservations.Select(r => r.ReservationId).ToList();

            var medicalRecords = await unitOfWork.MedicalRecordRepository
                .GetAll(mr => reservationIds.Contains(mr.ReservationId));
                
            var result = mapper.Map<List<MedicalRecordDTO>>(medicalRecords);
            
            // Thêm thông tin bệnh nhân từ reservation vào medical record
            foreach (var record in result)
            {
                var reservation = reservations.FirstOrDefault(r => r.ReservationId.ToString() == record.ReservationId);
                if (reservation != null)
                {
                    var patient = patients.FirstOrDefault(p => p.PatientId == reservation.PatientId);
                    if (patient != null)
                    {
                        var user = users.FirstOrDefault(u => u.UserId == patient.PatientId);
                        if (user != null)
                        {
                            record.PatientName = user.UserName;
                            record.PatientId = patient.PatientId;
                            record.PatientGender = user.Gender;
                            record.PatientDob = user.Dob.ToString("dd/MM/yyyy");
                        }
                    }
                }
            }
            
            return result;
        }
        public async Task<MedicalRecordDetailDTO> GetMedicalRecordDetailById(int Id)
        {
            var query = unitOfWork.MedicalRecordRepository.GetQueryable(mr=>mr.ReservationId.Equals(Id));
            var result = await query.ProjectTo<MedicalRecordDetailDTO>(mapper.ConfigurationProvider).FirstOrDefaultAsync();
            
            if (result != null && result.Reservation != null)
            {
                // Lấy thông tin reservation từ Repository
                var reservation = await unitOfWork.ReservationRepository.Get(r => r.ReservationId == Id);
                if (reservation != null)
                {
                    var patient = await unitOfWork.PatientRepository.Get(p => p.PatientId == reservation.PatientId);
                    if (patient != null)
                    {
                        // Lấy thông tin user từ bảng User
                        var user = await unitOfWork.UserRepository.Get(u => u.UserId == patient.PatientId);
                        if (user != null)
                        {
                            result.PatientName = user.UserName;
                            result.PatientId = patient.PatientId;
                            result.PatientGender = user.Gender;
                            result.PatientDob = user.Dob.ToString("dd/MM/yyyy");
                        }
                    }
                }
            }
            
            return result;
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

                var result = mapper.Map<MedicalRecordDTO>(newMedicalRecord);
                
                // Thêm thông tin bệnh nhân từ reservation
                if (reservation.PatientId > 0)
                {
                    var patient = await unitOfWork.PatientRepository.Get(p => p.PatientId == reservation.PatientId);
                    if (patient != null)
                    {
                        // Lấy thông tin user từ bảng User
                        var user = await unitOfWork.UserRepository.Get(u => u.UserId == patient.PatientId);
                        if (user != null)
                        {
                            result.PatientName = user.UserName;
                            result.PatientId = patient.PatientId;
                            result.PatientGender = user.Gender;
                            result.PatientDob = user.Dob.ToString("dd/MM/yyyy");
                        }
                    }
                }
                
                return result;
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