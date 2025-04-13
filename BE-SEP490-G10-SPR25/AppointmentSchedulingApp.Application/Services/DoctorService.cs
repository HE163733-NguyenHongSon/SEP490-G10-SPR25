using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AutoMapper;
using AppointmentSchedulingApp.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using AppointmentSchedulingApp.Infrastructure.Database;

namespace AppointmentSchedulingApp.Application.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IMapper mapper;
        private readonly AppointmentSchedulingDbContext dbContext;
        public IUnitOfWork unitOfWork { get; set; }

        public DoctorService(IMapper mapper, IUnitOfWork unitOfWork, AppointmentSchedulingDbContext dbContext)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.dbContext = dbContext;
        }

        public async Task<List<DoctorDTO>> GetDoctorList()
        {
            var doctors = await unitOfWork.DoctorRepository.GetAll();
            return mapper.Map<List<DoctorDTO>>(doctors);
        }

        public async Task<DoctorDetailDTO> GetDoctorDetailById(int doctorId)
        {
            var doctor = await unitOfWork.DoctorRepository.Get(d => d.DoctorId.Equals(doctorId));

            if (doctor == null)
            {
                return null;
            }

            // Get User information
            var user = await unitOfWork.UserRepository.Get(u => u.UserId == doctorId);
            
            var doctorDetailDto = mapper.Map<DoctorDetailDTO>(doctor);
            
            // Map user information if available
            if (user != null)
            {
                doctorDetailDto.UserName = user.UserName;
                doctorDetailDto.Password = user.Password;
                doctorDetailDto.CitizenId = user.CitizenId;
                doctorDetailDto.Phone = user.Phone;
                doctorDetailDto.Gender = user.Gender;
                doctorDetailDto.DateOfBirth = user.Dob.ToDateTime(new TimeOnly(0, 0));
                doctorDetailDto.Address = user.Address;
            }

            return doctorDetailDto;
        }
        
        public async Task<DoctorDetailDTO> UpdateDoctor(DoctorDetailDTO doctorDto)
        {
            try
            {
                // Kiểm tra doctor có tồn tại không
                var existingDoctor = await unitOfWork.DoctorRepository.Get(d => d.DoctorId == doctorDto.DoctorId);
                if (existingDoctor == null)
                {
                    throw new ValidationException($"Không tìm thấy bác sĩ với ID {doctorDto.DoctorId}");
                }
                
                // Begin transaction
                await unitOfWork.BeginTransactionAsync();
                
                // Update User info
                var user = await unitOfWork.UserRepository.Get(u => u.UserId == doctorDto.DoctorId);
                if (user != null)
                {
                    user.Password = doctorDto.Password;
                    user.AvatarUrl = doctorDto.AvatarUrl;
                    user.CitizenId = doctorDto.CitizenId;
                    user.Phone = doctorDto.Phone;
                    user.Gender = doctorDto.Gender;
                    user.Dob = DateOnly.FromDateTime(doctorDto.DateOfBirth);
                    user.Address = doctorDto.Address;
                    
                    unitOfWork.UserRepository.Update(user);
                }
                
                // Map từ DTO sang entity
                mapper.Map(doctorDto, existingDoctor);
                
                // Cập nhật thông tin
                unitOfWork.DoctorRepository.Update(existingDoctor);
                await unitOfWork.CommitAsync();
                await unitOfWork.CommitTransactionAsync();
                
                // Trả về thông tin đã được cập nhật
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
                // Begin transaction
                await unitOfWork.BeginTransactionAsync();
                
                // Kiểm tra doctor có tồn tại không
                var doctor = await unitOfWork.DoctorRepository.Get(d => d.DoctorId == doctorId);
                if (doctor == null)
                {
                    return false;
                }

                // Check if the doctor has any active schedules with reservations
                var doctorSchedules = doctor.DoctorSchedules.ToList();
                
                // Get all reservations for this doctor's schedules
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

                // Remove DoctorSpecialties relationships
                doctor.Specialties.Clear();
                
                // Remove DoctorServices relationships
                doctor.Services.Clear();

                // Delete all DoctorSchedules (this will cascade to delete related Reservations if configured correctly)
                foreach (var schedule in doctorSchedules)
                {
                    // Remove any reservations first
                    var relatedReservations = await unitOfWork.ReservationRepository.GetAll(r => r.DoctorScheduleId == schedule.DoctorScheduleId);
                    foreach (var reservation in relatedReservations)
                    {
                        // Remove any feedback related to this reservation
                        var feedback = await unitOfWork.FeedbackRepository.Get(f => f.ReservationId == reservation.ReservationId);
                        if (feedback != null)
                        {
                            unitOfWork.FeedbackRepository.Remove(feedback);
                        }
                        
                        // Remove any medical records related to this reservation
                        var medicalRecord = await unitOfWork.MedicalRecordRepository.Get(mr => mr.ReservationId == reservation.ReservationId);
                        if (medicalRecord != null)
                        {
                            unitOfWork.MedicalRecordRepository.Remove(medicalRecord);
                        }
                        
                        // Remove payments - need to use the dbContext since we don't have a repository
                        var payments = await dbContext.Payments
                            .Where(p => p.ReservationId == reservation.ReservationId)
                            .ToListAsync();
                            
                        foreach (var payment in payments)
                        {
                            dbContext.Payments.Remove(payment);
                        }
                        
                        unitOfWork.ReservationRepository.Remove(reservation);
                    }
                    
                    // Remove the doctor schedule using the dbContext
                    dbContext.DoctorSchedules.Remove(schedule);
                }
                
                // Update doctor first to persist relationship changes
                unitOfWork.DoctorRepository.Update(doctor);
                await unitOfWork.CommitAsync();
                
                // Remove any posts by this doctor
                var posts = await unitOfWork.PostRepository.GetAll(p => p.PostAuthorId == doctorId);
                foreach (var post in posts)
                {
                    unitOfWork.PostRepository.Remove(post);
                }
                
                // Remove certifications - need to use dbContext
                var certifications = await dbContext.Certifications
                    .Where(c => c.DoctorId == doctorId)
                    .ToListAsync();
                    
                foreach (var cert in certifications)
                {
                    dbContext.Certifications.Remove(cert);
                }
                
                // Now delete the doctor
                unitOfWork.DoctorRepository.Remove(doctor);
                await unitOfWork.CommitAsync();
                
                // Get associated user
                var user = await unitOfWork.UserRepository.Get(u => u.UserId == doctorId);
                
                // Xóa user nếu tồn tại
                if (user != null)
                {
                    // Xóa các UserRoles liên quan đến user này trước
                    await dbContext.Database.ExecuteSqlRawAsync(
                        "DELETE FROM UserRoles WHERE UserId = {0}", doctorId);
                    
                    // Đảm bảo thay đổi được lưu trước khi tiếp tục
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
                throw; // Rethrow validation exception to be caught by controller
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                await unitOfWork.RollbackTransactionAsync();
                throw new Exception($"Lỗi khi xóa bác sĩ: {ex.Message}", ex);
            }
        }
    }
}