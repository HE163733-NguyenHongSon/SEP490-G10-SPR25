using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.ComponentModel.DataAnnotations;
using AppointmentSchedulingApp.Infrastructure.Database;
using Microsoft.IdentityModel.Tokens;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Application.Services;

namespace AppointmentSchedulingApp.Application.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IMapper mapper;
        public IUnitOfWork unitOfWork { get; set; }
        private readonly AppointmentSchedulingDbContext dbContext;
        private readonly IMedicalRecordService _medicalRecordService;
        private readonly IEmailService _emailService;

        public DoctorService(IMapper mapper, IUnitOfWork unitOfWork, AppointmentSchedulingDbContext dbContext, 
            IMedicalRecordService medicalRecordService, IEmailService emailService)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.dbContext = dbContext;
            _medicalRecordService = medicalRecordService;
            _emailService = emailService;
        }

        public async Task<List<DoctorDTO>> GetDoctorList()
        {
            var query = unitOfWork.UserRepository.GetQueryable(u => u.Roles.Any(r => r.RoleId == 4) && u.IsActive);
            return await query.ProjectTo<DoctorDTO>(mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<DoctorDetailDTO> GetDoctorDetailById(int doctorId)
        {
            var query = unitOfWork.UserRepository.GetQueryable(u => u.UserId == doctorId);
            return await query.ProjectTo<DoctorDetailDTO>(mapper.ConfigurationProvider).FirstOrDefaultAsync();
        }
        public async Task<DoctorDetailDTO> UpdateDoctor(DoctorDetailDTO doctorDto)
        {
            try
            {
                var existingDoctor = await unitOfWork.DoctorRepository.Get(d => d.DoctorId == doctorDto.UserId);
                if (existingDoctor == null)
                {
                    throw new ValidationException($"Không tìm thấy bác sĩ với ID {doctorDto.UserId}");
                }

                await unitOfWork.BeginTransactionAsync();
                var user = await unitOfWork.UserRepository.Get(u => u.UserId == doctorDto.UserId);
                if (user != null)
                {
                    user.Password = doctorDto.Password;
                    user.AvatarUrl = doctorDto.AvatarUrl;
                    
                    if (!string.IsNullOrEmpty(doctorDto.Email))
                    {
                        user.Email = doctorDto.Email;
                    }
                    
                    if (!string.IsNullOrEmpty(doctorDto.CitizenId.ToString()))
                    {
                        if (long.TryParse(doctorDto.CitizenId.ToString(), out long citizenIdValue))
                        {
                            user.CitizenId = citizenIdValue;
                        }
                        else
                        {
                            throw new ValidationException($"Mã CCCD/CMND không hợp lệ: {doctorDto.CitizenId}");
                        }
                    }
                    
                    user.Phone = doctorDto.Phone;
                    user.Gender = doctorDto.Gender;
                    if (DateOnly.TryParse(doctorDto.Dob, out var dob))
                    {
                        user.Dob = dob;
                    }
                    else
                    {
                        throw new Exception("Ngày sinh không hợp lệ.");
                    }
                    user.Address = doctorDto.Address;

                    unitOfWork.UserRepository.Update(user);
                }

                // Handle the Services collection
                if (doctorDto.Services != null && doctorDto.Services.Any())
                {
                    // Clear existing services
                    existingDoctor.Services.Clear();
                    
                    // Add services from DTO
                    foreach (var serviceDto in doctorDto.Services)
                    {
                        var service = await unitOfWork.ServiceRepository.Get(s => s.ServiceId == serviceDto.ServiceId);
                        if (service != null)
                        {
                            existingDoctor.Services.Add(service);
                        }
                    }
                }

                existingDoctor.AcademicTitle = doctorDto.AcademicTitle;
                existingDoctor.Degree = doctorDto.Degree;
                existingDoctor.CurrentWork = doctorDto.CurrentWork;
                existingDoctor.DoctorDescription = doctorDto.DoctorDescription;
                existingDoctor.WorkExperience = doctorDto.WorkExperience;
                existingDoctor.Organization = doctorDto.Organization;
                existingDoctor.Prize = doctorDto.Prize;
                existingDoctor.ResearchProject = doctorDto.ResearchProject;
                existingDoctor.TrainingProcess = doctorDto.TrainingProcess;
                existingDoctor.Rating = doctorDto.Rating;
                existingDoctor.RatingCount = doctorDto.RatingCount;

                unitOfWork.DoctorRepository.Update(existingDoctor);
                await unitOfWork.CommitAsync();
                await unitOfWork.CommitTransactionAsync();

                return await GetDoctorDetailById(existingDoctor.DoctorId);
            }
            catch (ValidationException)
            {
                await unitOfWork.RollbackTransactionAsync();
                throw;
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                await unitOfWork.RollbackTransactionAsync();
                throw new Exception($"Lỗi khi cập nhật bác sĩ: {ex.Message}", ex);
            }
        }

        public async Task<bool> DeleteDoctor(int doctorId)
        {
            try
            {
                await unitOfWork.BeginTransactionAsync();

                var doctor = await unitOfWork.DoctorRepository.Get(d => d.DoctorId == doctorId);
                if (doctor == null)
                {
                    return false;
                }

                var doctorSchedules = doctor.DoctorSchedules.ToList();

                var hasActiveReservations = false;
                foreach (var schedule in doctorSchedules)
                {
                    var reservations = await unitOfWork.ReservationRepository.GetAll(r =>
                        r.DoctorScheduleId == schedule.DoctorScheduleId &&
                        (r.Status != "Cancelled" && r.Status != "Completed"));

                    if (reservations.Any())
                    {
                        hasActiveReservations = true;
                        break;
                    }
                }

                if (hasActiveReservations)
                {
                    throw new ValidationException("Không thể xóa bác sĩ vì có cuộc hẹn đang hoạt động. Vui lòng hủy tất cả cuộc hẹn trước khi xóa.");
                }

                doctor.Specialties.Clear();

                doctor.Services.Clear();

                foreach (var schedule in doctorSchedules)
                {
                    var relatedReservations = await unitOfWork.ReservationRepository.GetAll(r => r.DoctorScheduleId == schedule.DoctorScheduleId);
                    foreach (var reservation in relatedReservations)
                    {
                        var feedback = await unitOfWork.FeedbackRepository.Get(f => f.ReservationId == reservation.ReservationId);
                        if (feedback != null)
                        {
                            unitOfWork.FeedbackRepository.Remove(feedback);
                        }

                        var medicalRecord = await unitOfWork.MedicalRecordRepository.Get(mr => mr.ReservationId == reservation.ReservationId);
                        if (medicalRecord != null)
                        {
                            unitOfWork.MedicalRecordRepository.Remove(medicalRecord);
                        }

                        var payments = await dbContext.Payments
                            .Where(p => p.ReservationId == reservation.ReservationId)
                            .ToListAsync();

                        foreach (var payment in payments)
                        {
                            dbContext.Payments.Remove(payment);
                        }

                        unitOfWork.ReservationRepository.Remove(reservation);
                    }

                    dbContext.DoctorSchedules.Remove(schedule);
                }

                unitOfWork.DoctorRepository.Update(doctor);
                await unitOfWork.CommitAsync();

                var posts = await unitOfWork.PostRepository.GetAll(p => p.PostAuthorId == doctorId);
                foreach (var post in posts)
                {
                    unitOfWork.PostRepository.Remove(post);
                }

                var certifications = await dbContext.Certifications
                    .Where(c => c.DoctorId == doctorId)
                    .ToListAsync();

                foreach (var cert in certifications)
                {
                    dbContext.Certifications.Remove(cert);
                }

                unitOfWork.DoctorRepository.Remove(doctor);
                await unitOfWork.CommitAsync();

                var user = await unitOfWork.UserRepository.Get(u => u.UserId == doctorId);

                if (user != null)
                {
                    await dbContext.Database.ExecuteSqlRawAsync(
                        "DELETE FROM UserRoles WHERE UserId = {0}", doctorId);

                    await dbContext.SaveChangesAsync();

                    unitOfWork.UserRepository.Remove(user);
                    await unitOfWork.CommitAsync();
                }

                await unitOfWork.CommitTransactionAsync();

                return true;
            }
            catch (ValidationException ex)
            {
                await unitOfWork.RollbackAsync();
                await unitOfWork.RollbackTransactionAsync();
                throw;
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                await unitOfWork.RollbackTransactionAsync();
                throw new Exception($"Lỗi khi xóa bác sĩ: {ex.Message}", ex);
            }
        }

        // New methods for doctors
        public async Task<List<ReservationDTO>> GetDoctorAppointments(int doctorId, string status = "Xác nhận")
        {
            // Get doctor schedules
            var doctorSchedules = await unitOfWork.DoctorScheduleRepository.GetAll(ds => ds.DoctorId == doctorId);
            if (!doctorSchedules.Any())
            {
                return new List<ReservationDTO>();
            }

            var scheduleIds = doctorSchedules.Select(ds => ds.DoctorScheduleId).ToList();

            // Get relevant reservations
            var reservations = await unitOfWork.ReservationRepository.GetAll(
                r => scheduleIds.Contains(r.DoctorScheduleId) && r.Status == status);

            return mapper.Map<List<ReservationDTO>>(reservations);
        }

        public async Task<bool> CancelAppointment(int reservationId, string cancellationReason)
        {
            try
            {
                await unitOfWork.BeginTransactionAsync();

                var reservation = await unitOfWork.ReservationRepository.Get(r => r.ReservationId == reservationId);
                if (reservation == null)
                {
                    throw new ValidationException("Lịch hẹn không tồn tại");
                }

                if (reservation.Status == "Hoàn thành" || reservation.Status == "Hủy")
                {
                    throw new ValidationException("Không thể hủy lịch hẹn đã hoàn thành hoặc đã hủy");
                }

                // Update reservation status
                reservation.Status = "Hủy";
                reservation.CancellationReason = cancellationReason;
                reservation.UpdatedDate = DateTime.Now;

                unitOfWork.ReservationRepository.Update(reservation);
                await unitOfWork.CommitAsync();

                // Get patient information for notification
                var patient = await unitOfWork.PatientRepository.Get(p => p.PatientId == reservation.PatientId);
                if (patient != null)
                {
                    var user = await unitOfWork.UserRepository.Get(u => u.UserId == patient.PatientId);
                    if (user != null && !string.IsNullOrEmpty(user.Email))
                    {
                        // Get doctor information
                        var doctorSchedule = await unitOfWork.DoctorScheduleRepository.Get(
                            ds => ds.DoctorScheduleId == reservation.DoctorScheduleId);
                        var doctor = await unitOfWork.UserRepository.Get(u => u.UserId == doctorSchedule.DoctorId);

                        // Send email notification
                        string subject = "Thông báo hủy lịch khám";
                        string body = $"Xin chào {user.UserName},\n\n" +
                            $"Bác sĩ {doctor.UserName} đã hủy lịch khám của bạn vào ngày {reservation.AppointmentDate.ToString("dd/MM/yyyy")}.\n" +
                            $"Lý do: {cancellationReason}\n\n" +
                            $"Vui lòng đặt lịch khám mới.\n\n" +
                            $"Trân trọng,\nPhòng khám";

                        // Create message object for email service with correct constructor
                        var emailTo = new List<string> { user.Email };
                        var message = new Message(emailTo, subject, body);

                        _emailService.SendEmail(message);
                    }
                }

                await unitOfWork.CommitTransactionAsync();
                return true;
            }
            catch (ValidationException)
            {
                await unitOfWork.RollbackTransactionAsync();
                throw;
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                await unitOfWork.RollbackTransactionAsync();
                throw new Exception($"Lỗi khi hủy lịch hẹn: {ex.Message}", ex);
            }
        }

        public async Task<MedicalRecordDTO> CreateMedicalRecord(int reservationId, MedicalRecordDTO medicalRecordDTO)
        {
            var createDTO = new MedicalRecordCreateDTO
            {
                ReservationId = reservationId,
                Symptoms = medicalRecordDTO.Symptoms,
                Diagnosis = medicalRecordDTO.Diagnosis,
                TreatmentPlan = medicalRecordDTO.TreatmentPlan,
                FollowUpDate = medicalRecordDTO.FollowUpDate,
                Notes = medicalRecordDTO.Notes
            };

            return await _medicalRecordService.CreateMedicalRecord(createDTO);
        }

        public async Task<bool> IsFirstTimePatient(int patientId)
        {
            return !(await _medicalRecordService.CheckIfPatientHasPreviousMedicalRecords(patientId));
        }

        public async Task<List<MedicalRecordDTO>> GetPatientPreviousMedicalRecords(int patientId)
        {
            return await _medicalRecordService.GetPatientMedicalHistoryByPatientId(patientId);
        }
    }
}