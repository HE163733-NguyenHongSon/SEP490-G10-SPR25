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

namespace AppointmentSchedulingApp.Application.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IMapper mapper;
        public IUnitOfWork unitOfWork { get; set; }
        private readonly AppointmentSchedulingDbContext dbContext;
        public DoctorService(IMapper mapper, IUnitOfWork unitOfWork, AppointmentSchedulingDbContext dbContext)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.dbContext = dbContext;
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

                // Map all other properties except Services (which we handled manually)
                mapper.Map(doctorDto, existingDoctor);

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
    }
}