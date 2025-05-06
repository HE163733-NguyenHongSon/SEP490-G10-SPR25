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

            // Get today's date (only the date part, not time)
            var today = DateTime.Today;
            
            // Get relevant reservations for today and future dates
            var reservations = await unitOfWork.ReservationRepository.GetAll(
                r => scheduleIds.Contains(r.DoctorScheduleId) && 
                     r.Status == status &&
                     r.AppointmentDate.Date >= today);
             
            // Sort reservations by date in descending order (newest first)
            var sortedReservations = reservations.OrderByDescending(r => r.AppointmentDate).ToList();

            // Map to DTO including patient information
            var reservationDTOs = mapper.Map<List<ReservationDTO>>(sortedReservations);

            // Ensure patient information is loaded for each reservation
            foreach (var dto in reservationDTOs)
            {
                var reservation = sortedReservations.First(r => r.ReservationId == dto.ReservationId);
                var patient = await unitOfWork.PatientRepository.Get(p => p.PatientId == reservation.PatientId);
                if (patient != null)
                {
                    var patientUser = await unitOfWork.UserRepository.Get(u => u.UserId == patient.PatientId);
                    if (patientUser != null)
                    {
                        dto.PatientName = patientUser.UserName;
                        
                        Console.WriteLine($"Set PatientName={patientUser.UserName} for ReservationId={dto.ReservationId}");
                    }
                }
            }

            return reservationDTOs;
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
        
        public async Task<IEnumerable<DoctorDTO>> GetDoctorListByServiceId(int serviceId)
        {
            try
            {
                var doctors = await dbContext.Doctors
                    .Include(d => d.Services)
                    .Include(d => d.DoctorNavigation)
                    .Include(d => d.Specialties)
                    .Where(d => d.Services.Any(s => s.ServiceId == serviceId) && d.DoctorNavigation.IsActive)
                    .ToListAsync();

                // Map dữ liệu thủ công để tránh lỗi Roles mapping
                var result = doctors.Select(d => new DoctorDTO
                {
                    UserId = d.DoctorNavigation.UserId,
                    UserName = d.DoctorNavigation.UserName,
                    Email = d.DoctorNavigation.Email,
                    Phone = d.DoctorNavigation.Phone,
                    AvatarUrl = d.DoctorNavigation.AvatarUrl,
                    Gender = d.DoctorNavigation.Gender,
                    Dob = d.DoctorNavigation.Dob.ToString(),
                    Address = d.DoctorNavigation.Address,
                    AcademicTitle = d.AcademicTitle,
                    Degree = d.Degree,
                    CurrentWork = d.CurrentWork,
                    DoctorDescription = d.DoctorDescription,
                    SpecialtyNames = d.Specialties.Select(s => s.SpecialtyName).ToArray(),
                    NumberOfService = d.Services.Count,
                    NumberOfExamination = 0, // Có thể tính toán sau nếu cần
                    Rating = d.Rating,
                    RatingCount = d.RatingCount
                }).ToList();

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception($"Lỗi khi lấy danh sách bác sĩ theo dịch vụ: {ex.Message}", ex);
            }
        }

        public async Task<IEnumerable<DoctorDTO>> GetDoctorsBySpecialtyId(int specialtyId)
        {
            try
            {
                var doctors = await dbContext.Doctors
                    .Include(d => d.Services)
                    .Include(d => d.DoctorNavigation)
                    .Include(d => d.Specialties)
                    .Where(d => d.Specialties.Any(s => s.SpecialtyId == specialtyId) && d.DoctorNavigation.IsActive)
                    .ToListAsync();

                // Map dữ liệu thủ công để tránh lỗi Roles mapping
                var result = doctors.Select(d => new DoctorDTO
                {
                    UserId = d.DoctorNavigation.UserId,
                    UserName = d.DoctorNavigation.UserName,
                    Email = d.DoctorNavigation.Email,
                    Phone = d.DoctorNavigation.Phone,
                    AvatarUrl = d.DoctorNavigation.AvatarUrl,
                    Gender = d.DoctorNavigation.Gender,
                    Dob = d.DoctorNavigation.Dob.ToString(),
                    Address = d.DoctorNavigation.Address,
                    AcademicTitle = d.AcademicTitle,
                    Degree = d.Degree,
                    CurrentWork = d.CurrentWork,
                    DoctorDescription = d.DoctorDescription,
                    SpecialtyNames = d.Specialties.Select(s => s.SpecialtyName).ToArray(),
                    NumberOfService = d.Services.Count,
                    NumberOfExamination = 0, // Có thể tính toán sau nếu cần
                    Rating = d.Rating,
                    RatingCount = d.RatingCount
                }).ToList();

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception($"Lỗi khi lấy danh sách bác sĩ theo chuyên khoa: {ex.Message}", ex);
            }
        }

        public async Task<List<MedicalRecordDTO>> GetDoctorMedicalRecords(int doctorId)
        {
            try
            {
                // Get all doctor schedules for the specified doctor
                var doctorSchedules = await unitOfWork.DoctorScheduleRepository
                    .GetAll(ds => ds.DoctorId == doctorId);
                    
                if (doctorSchedules == null || !doctorSchedules.Any())
                {
                    return new List<MedicalRecordDTO>();
                }

                // Get all schedule IDs
                var scheduleIds = doctorSchedules.Select(ds => ds.DoctorScheduleId).ToList();

                // Get all reservations for these schedules
                var reservations = await unitOfWork.ReservationRepository
                    .GetAll(r => scheduleIds.Contains(r.DoctorScheduleId));
                    
                if (reservations == null || !reservations.Any())
                {
                    return new List<MedicalRecordDTO>();
                }

                // Get all reservation IDs
                var reservationIds = reservations.Select(r => r.ReservationId).ToList();

                // Get all patient IDs from reservations
                var patientIds = reservations.Select(r => r.PatientId).Distinct().ToList();
                
                // Get all patients
                var patients = await unitOfWork.PatientRepository.GetAll(p => patientIds.Contains(p.PatientId));
                
                // Get all user information
                var userIds = patients.Select(p => p.PatientId).ToList();
                var users = await unitOfWork.UserRepository.GetAll(u => userIds.Contains(u.UserId));

                // Get all medical records for these reservations
                var medicalRecords = await unitOfWork.MedicalRecordRepository
                    .GetAll(mr => reservationIds.Contains(mr.ReservationId));

                // Convert to DTOs
                var result = mapper.Map<List<MedicalRecordDTO>>(medicalRecords);
                
                // Add patient information to each medical record
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
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving medical records for doctor {doctorId}: {ex.Message}", ex);
            }
        }

        public async Task<List<MedicalRecordDTO>> GetMedicalRecordsByPatientAndDoctorId(int doctorId, int patientId)
        {
            try
            {
                // Get all doctor schedules for the specified doctor
                var doctorSchedules = await unitOfWork.DoctorScheduleRepository
                    .GetAll(ds => ds.DoctorId == doctorId);
                    
                if (doctorSchedules == null || !doctorSchedules.Any())
                {
                    return new List<MedicalRecordDTO>();
                }

                // Get all schedule IDs
                var scheduleIds = doctorSchedules.Select(ds => ds.DoctorScheduleId).ToList();

                // Get all reservations for these schedules and the specific patient
                var reservations = await unitOfWork.ReservationRepository
                    .GetAll(r => scheduleIds.Contains(r.DoctorScheduleId) && r.PatientId == patientId);
                    
                if (reservations == null || !reservations.Any())
                {
                    return new List<MedicalRecordDTO>();
                }

                // Get all reservation IDs
                var reservationIds = reservations.Select(r => r.ReservationId).ToList();
                
                // Get patient information
                var patient = await unitOfWork.PatientRepository.Get(p => p.PatientId == patientId);
                var user = patient != null ? await unitOfWork.UserRepository.Get(u => u.UserId == patient.PatientId) : null;

                // Get all medical records for these reservations
                var medicalRecords = await unitOfWork.MedicalRecordRepository
                    .GetAll(mr => reservationIds.Contains(mr.ReservationId));

                // Convert to DTOs
                var result = mapper.Map<List<MedicalRecordDTO>>(medicalRecords);
                
                // Add patient information to each medical record
                if (patient != null && user != null)
                {
                    foreach (var record in result)
                    {
                        record.PatientName = user.UserName;
                        record.PatientId = patient.PatientId;
                        record.PatientGender = user.Gender;
                        record.PatientDob = user.Dob.ToString("dd/MM/yyyy");
                    }
                }
                
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving medical records for patient {patientId} and doctor {doctorId}: {ex.Message}", ex);
            }
        }

        public async Task<ReservationDTO> GetAppointmentById(int reservationId)
        {
            try
            {
                var reservation = await unitOfWork.ReservationRepository.Get(r => r.ReservationId == reservationId);
                
                if (reservation == null)
                {
                    return null;
                }
                
                var reservationDTO = mapper.Map<ReservationDTO>(reservation);
                
                // Ensure patient name is set
                if (reservation.Patient != null && reservation.Patient.PatientNavigation != null)
                {
                    reservationDTO.PatientName = reservation.Patient.PatientNavigation.UserName;
                }
                
                return reservationDTO;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting appointment by ID: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> RequestCancellation(int reservationId, string cancellationReason)
        {
            try
            {
                var reservation = await unitOfWork.ReservationRepository.Get(r => r.ReservationId == reservationId);
                
                if (reservation == null)
                {
                    return false;
                }
                
                // Update the cancellation reason but don't change status yet
                reservation.CancellationReason = cancellationReason;
                
                unitOfWork.ReservationRepository.Update(reservation);
                await unitOfWork.CommitAsync();
                
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error requesting cancellation: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> CancelAppointment(int reservationId, string cancellationReason)
        {
            try
            {
                var reservation = await unitOfWork.ReservationRepository.Get(r => r.ReservationId == reservationId);
                
                if (reservation == null)
                {
                    return false;
                }
                
                // Cập nhật trạng thái thành "Hủy" và lưu lý do hủy
                reservation.Status = "Hủy";
                reservation.CancellationReason = cancellationReason;
                reservation.UpdatedDate = DateTime.Now;
                
                unitOfWork.ReservationRepository.Update(reservation);
                await unitOfWork.CommitAsync();
                
                // Log thông tin hủy lịch
                Console.WriteLine($"Appointment {reservationId} cancelled with reason: {cancellationReason}");

                // Thông tin bệnh nhân bị hủy lịch
                if (reservation.Patient?.PatientNavigation != null)
                {
                    var patientName = reservation.Patient.PatientNavigation.UserName;
                    var patientEmail = reservation.Patient.PatientNavigation.Email;
                    Console.WriteLine($"Notification should be sent to patient: {patientName} ({patientEmail})");
                }
                
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error cancelling appointment: {ex.Message}");
                throw;
            }
        }

        // Thêm phương thức mới để cập nhật trạng thái lịch hẹn
        public async Task<bool> UpdateAppointmentStatus(int reservationId, string status)
        {
            try
            {
                var reservation = await unitOfWork.ReservationRepository.Get(r => r.ReservationId == reservationId);
                
                if (reservation == null)
                {
                    return false;
                }
                
                // Cập nhật trạng thái
                reservation.Status = status;
                reservation.UpdatedDate = DateTime.Now;
                
                unitOfWork.ReservationRepository.Update(reservation);
                await unitOfWork.CommitAsync();
                
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating appointment status: {ex.Message}");
                throw;
            }
        }
    }
}