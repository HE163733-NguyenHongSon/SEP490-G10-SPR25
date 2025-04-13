using System.ComponentModel.DataAnnotations;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Infrastructure.Database;
using AppointmentSchedulingApp.Infrastructure.Helper;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AppointmentSchedulingApp.Application.Services
{
    public class AdminService : IAdminService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppointmentSchedulingDbContext _dbContext;
        private readonly IRoleService _roleService;

        public AdminService(IMapper mapper, IUnitOfWork unitOfWork, AppointmentSchedulingDbContext dbContext, IRoleService roleService)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _dbContext = dbContext;
            _roleService = roleService;
        }

        public async Task<List<UserDTO>> GetAllAccounts()
        {
            var users = await _dbContext.Users
                .Include(u => u.Roles)
                .ToListAsync();

            return _mapper.Map<List<UserDTO>>(users);
        }

        public async Task<Dictionary<string, List<UserDTO>>> GetAccountsByType()
        {
            var result = new Dictionary<string, List<UserDTO>>();
            
            // Lấy tất cả users với roles và các thông tin liên quan
            var users = await _dbContext.Users
                .Include(u => u.Roles)
                .Include(u => u.Doctor)
                .Include(u => u.Receptionist)
                .Include(u => u.Patient)
                .ToListAsync();
                
            // Phân loại thành nhân viên bệnh viện (bác sĩ và lễ tân)
            var staffUsers = users
                .Where(u => u.Doctor != null || u.Receptionist != null)
                .ToList();
                
            // Phân loại thành khách hàng (bệnh nhân và người giám hộ)
            var customerUsers = users
                .Where(u => u.Patient != null || u.PatientGuardians.Any())
                .ToList();
                
            result["staff"] = _mapper.Map<List<UserDTO>>(staffUsers);
            result["customers"] = _mapper.Map<List<UserDTO>>(customerUsers);
            
            return result;
        }

        public async Task<UserDTO> CreateDoctorAccount(AdminDTO adminDTO)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                // Validate required fields
                if (string.IsNullOrEmpty(adminDTO.UserName))
                    throw new ValidationException("Username is required");
                
                if (string.IsNullOrEmpty(adminDTO.Email))
                    throw new ValidationException("Email is required");
                
                if (string.IsNullOrEmpty(adminDTO.Password))
                    throw new ValidationException("Password is required");
                
                if (string.IsNullOrEmpty(adminDTO.Phone))
                    throw new ValidationException("Phone number is required");
                
                if (string.IsNullOrEmpty(adminDTO.Gender))
                    throw new ValidationException("Gender is required");
                
                // Validate date format
                if (!DateOnly.TryParse(adminDTO.Dob, out DateOnly dob))
                    throw new ValidationException("Invalid date format for Date of Birth");
                
                // Validate email format
                if (!IsValidEmail(adminDTO.Email))
                    throw new ValidationException("Invalid email format");

                // Kiểm tra số điện thoại đã tồn tại
                var existingPhone = await _dbContext.Users.FirstOrDefaultAsync(u => u.Phone == adminDTO.Phone);
                if (existingPhone != null)
                {
                    throw new ValidationException("Số điện thoại đã tồn tại trong hệ thống");
                }

                // Kiểm tra email đã tồn tại
                var existingEmail = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == adminDTO.Email);
                if (existingEmail != null)
                {
                    throw new ValidationException("Email đã tồn tại trong hệ thống");
                }

                // Create user account
                var user = new User
                {
                    UserName = adminDTO.UserName,
                    Password = adminDTO.Password,
                    Email = adminDTO.Email,
                    Phone = adminDTO.Phone,
                    Gender = ConvertGender(adminDTO.Gender), // Chuyển đổi gender
                    Dob = dob, // Use parsed DateOnly value
                    Address = adminDTO.Address,
                    CitizenId = adminDTO.CitizenId,
                    IsActive = true,
                    IsVerify = true
                };

                _dbContext.Users.Add(user);
                await _dbContext.SaveChangesAsync();

                // Assign doctor role
                var doctorRole = await _roleService.GetRoleByNameAsync(AppRole.Doctor);
                user.Roles.Add(doctorRole);

                // Create doctor profile
                var doctor = new Doctor
                {
                    DoctorId = user.UserId,
                    DoctorDescription = adminDTO.Name,  // Use Name as default description
                    CurrentWork = "Đang làm việc"       // Default current work status
                };

                _dbContext.Doctors.Add(doctor);
                await _dbContext.SaveChangesAsync();

                await transaction.CommitAsync();
                return _mapper.Map<UserDTO>(user);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<UserDTO> CreateReceptionistAccount(AdminDTO adminDTO)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                // Validate required fields
                if (string.IsNullOrEmpty(adminDTO.UserName))
                    throw new ValidationException("Username is required");
                
                if (string.IsNullOrEmpty(adminDTO.Email))
                    throw new ValidationException("Email is required");
                
                if (string.IsNullOrEmpty(adminDTO.Password))
                    throw new ValidationException("Password is required");
                
                if (string.IsNullOrEmpty(adminDTO.Phone))
                    throw new ValidationException("Phone number is required");
                
                if (string.IsNullOrEmpty(adminDTO.Gender))
                    throw new ValidationException("Gender is required");
                
                // Validate date format
                if (!DateOnly.TryParse(adminDTO.Dob, out DateOnly dob))
                    throw new ValidationException("Invalid date format for Date of Birth");
                
                // Validate email format
                if (!IsValidEmail(adminDTO.Email))
                    throw new ValidationException("Invalid email format");

                // Kiểm tra số điện thoại đã tồn tại
                var existingPhone = await _dbContext.Users.FirstOrDefaultAsync(u => u.Phone == adminDTO.Phone);
                if (existingPhone != null)
                {
                    throw new ValidationException("Số điện thoại đã tồn tại trong hệ thống");
                }

                // Kiểm tra email đã tồn tại
                var existingEmail = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == adminDTO.Email);
                if (existingEmail != null)
                {
                    throw new ValidationException("Email đã tồn tại trong hệ thống");
                }

                // Create user account
                var user = new User
                {
                    UserName = adminDTO.UserName,
                    Password = adminDTO.Password,
                    Email = adminDTO.Email,
                    Phone = adminDTO.Phone,
                    Gender = ConvertGender(adminDTO.Gender), // Chuyển đổi gender
                    Dob = dob, // Use parsed DateOnly value
                    Address = adminDTO.Address,
                    CitizenId = adminDTO.CitizenId,
                    IsActive = true,
                    IsVerify = true
                };

                _dbContext.Users.Add(user);
                await _dbContext.SaveChangesAsync();

                // Assign receptionist role
                var receptionistRole = await _roleService.GetRoleByNameAsync(AppRole.Receptionist);
                user.Roles.Add(receptionistRole);

                // Create receptionist profile
                var receptionist = new Receptionist
                {
                    ReceptionistId = user.UserId,
                    StartDate = DateOnly.FromDateTime(DateTime.Now),
                    Shift = "Ca sáng", // Default shift
                    Status = "Đang làm việc"
                };

                _dbContext.Receptionists.Add(receptionist);
                await _dbContext.SaveChangesAsync();

                await transaction.CommitAsync();
                return _mapper.Map<UserDTO>(user);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<UserDTO> UpdateAccount(int userId, AdminDTO adminDTO)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                var user = await _dbContext.Users
                    .Include(u => u.Roles)
                    .FirstOrDefaultAsync(u => u.UserId == userId);

                if (user == null)
                    throw new KeyNotFoundException($"User with ID {userId} not found");

                // Kiểm tra số điện thoại đã tồn tại (nếu thay đổi số điện thoại)
                if (user.Phone != adminDTO.Phone)
                {
                    var existingPhone = await _dbContext.Users.FirstOrDefaultAsync(u => u.Phone == adminDTO.Phone && u.UserId != userId);
                    if (existingPhone != null)
                    {
                        throw new ValidationException("Số điện thoại đã tồn tại trong hệ thống");
                    }
                }

                user.UserName = adminDTO.UserName;
                user.Email = adminDTO.Email;
                user.Phone = adminDTO.Phone;
                user.Gender = ConvertGender(adminDTO.Gender);
                
                // Parse date string to DateOnly
                if (DateOnly.TryParse(adminDTO.Dob, out DateOnly dob))
                {
                    user.Dob = dob;
                }
                
                user.Address = adminDTO.Address;
                user.CitizenId = adminDTO.CitizenId;
                
                // Cập nhật mật khẩu nếu được cung cấp
                if (!string.IsNullOrEmpty(adminDTO.Password))
                {
                    try
                    {
                        // Lưu trực tiếp mật khẩu không mã hóa
                        user.Password = adminDTO.Password;
                        Console.WriteLine($"Đã cập nhật mật khẩu cho người dùng {user.UserName}");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Lỗi khi cập nhật mật khẩu: {ex.Message}");
                        // Không throw lỗi ở đây để vẫn cập nhật được các thông tin khác
                    }
                }

                await _dbContext.SaveChangesAsync();
                await transaction.CommitAsync();

                return _mapper.Map<UserDTO>(user);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<bool> DeleteAccount(int userId)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                var user = await _dbContext.Users
                    .Include(u => u.Roles)
                    .Include(u => u.Doctor)
                    .ThenInclude(d => d.DoctorSchedules)
                    .Include(u => u.Doctor)
                    .ThenInclude(d => d.Specialties)
                    .Include(u => u.Doctor)
                    .ThenInclude(d => d.Services)
                    .Include(u => u.Doctor)
                    .ThenInclude(d => d.Certifications)
                    .Include(u => u.Receptionist)
                    .FirstOrDefaultAsync(u => u.UserId == userId);

                if (user == null)
                    return false;

                if (user.Doctor != null)
                {
                    var hasActiveAppointments = await _dbContext.DoctorSchedules
                        .Include(ds => ds.Reservations)
                        .Where(ds => ds.DoctorId == userId)
                        .SelectMany(ds => ds.Reservations)
                        .AnyAsync(r => r.Status != "Cancelled" && r.Status != "Completed");

                    if (hasActiveAppointments)
                    {
                        throw new ValidationException("Không thể xóa tài khoản bác sĩ vì có lịch hẹn đang hoạt động");
                    }

                    var doctor = user.Doctor;
                    
                    doctor.Specialties.Clear();
                    doctor.Services.Clear();
                    
                    foreach (var schedule in doctor.DoctorSchedules.ToList())
                    {
                        var reservations = await _dbContext.Reservations
                            .Where(r => r.DoctorScheduleId == schedule.DoctorScheduleId)
                            .ToListAsync();
                            
                        foreach (var reservation in reservations)
                        {
                            var feedback = await _dbContext.Feedbacks
                                .FirstOrDefaultAsync(f => f.ReservationId == reservation.ReservationId);
                            if (feedback != null)
                            {
                                _dbContext.Feedbacks.Remove(feedback);
                            }
                            
                            var medicalRecord = await _dbContext.MedicalRecords
                                .FirstOrDefaultAsync(mr => mr.ReservationId == reservation.ReservationId);
                            if (medicalRecord != null)
                            {
                                _dbContext.MedicalRecords.Remove(medicalRecord);
                            }
                            
                            var payments = await _dbContext.Payments
                                .Where(p => p.ReservationId == reservation.ReservationId)
                                .ToListAsync();
                                
                            foreach (var payment in payments)
                            {
                                _dbContext.Payments.Remove(payment);
                            }
                            
                            _dbContext.Reservations.Remove(reservation);
                        }
                        
                        _dbContext.DoctorSchedules.Remove(schedule);
                    }
                    
                    var posts = await _dbContext.Posts
                        .Where(p => p.PostAuthorId == userId)
                        .ToListAsync();
                    foreach (var post in posts)
                    {
                        _dbContext.Posts.Remove(post);
                    }
                    
                    foreach (var certification in doctor.Certifications.ToList())
                    {
                        _dbContext.Certifications.Remove(certification);
                    }
                    
                    _dbContext.Doctors.Remove(doctor);
                    await _dbContext.SaveChangesAsync();
                }

                if (user.Receptionist != null)
                {
                    var hasUnfinishedPayments = await _dbContext.Payments
                        .AnyAsync(p => p.ReceptionistId == userId && p.PaymentStatus != "Completed");

                    if (hasUnfinishedPayments)
                    {
                        throw new ValidationException("Không thể xóa tài khoản lễ tân vì có thanh toán chưa hoàn thành");
                    }

                    var receptionist = await _dbContext.Receptionists
                        .Include(r => r.Payments)
                        .FirstOrDefaultAsync(r => r.ReceptionistId == userId);

                    if (receptionist != null)
                    {
                        foreach (var payment in receptionist.Payments)
                        {
                            payment.ReceptionistId = null;
                        }

                        _dbContext.Receptionists.Remove(receptionist);
                    }
                }

                if (user.Patient != null)
                {
                    var hasActiveReservations = await _dbContext.Reservations
                        .AnyAsync(r => r.PatientId == user.Patient.PatientId && 
                                       (r.Status != "Cancelled" && r.Status != "Completed"));
                            
                    if (hasActiveReservations)
                    {
                        throw new ValidationException("Không thể xóa tài khoản bệnh nhân vì có lịch hẹn đang hoạt động");
                    }
                    
                    var reservations = await _dbContext.Reservations
                        .Where(r => r.PatientId == user.Patient.PatientId)
                        .ToListAsync();
                        
                    foreach (var reservation in reservations)
                    {
                        var feedback = await _dbContext.Feedbacks
                            .FirstOrDefaultAsync(f => f.ReservationId == reservation.ReservationId);
                        if (feedback != null)
                        {
                            _dbContext.Feedbacks.Remove(feedback);
                        }
                        
                        var medicalRecord = await _dbContext.MedicalRecords
                            .FirstOrDefaultAsync(mr => mr.ReservationId == reservation.ReservationId);
                        if (medicalRecord != null)
                        {
                            _dbContext.MedicalRecords.Remove(medicalRecord);
                        }
                        
                        var payments = await _dbContext.Payments
                            .Where(p => p.ReservationId == reservation.ReservationId)
                            .ToListAsync();
                            
                        foreach (var payment in payments)
                        {
                            _dbContext.Payments.Remove(payment);
                        }
                        
                        _dbContext.Reservations.Remove(reservation);
                    }
                    
                    _dbContext.Patients.Remove(user.Patient);
                    await _dbContext.SaveChangesAsync();
                }
                
                var guardedPatients = await _dbContext.Patients
                    .Where(p => p.GuardianId == userId)
                    .ToListAsync();
                    
                foreach (var patient in guardedPatients)
                {                    // Xóa liên kết người giám hộ
                    patient.GuardianId = null;
                }
                

                var userComments = await _dbContext.Comments
                    .Where(c => c.UserId == userId)
                    .ToListAsync();
                    
                foreach (var comment in userComments)
                {
                    _dbContext.Comments.Remove(comment);
                }
                
                await _dbContext.SaveChangesAsync();

                user.Roles.Clear();
                await _dbContext.SaveChangesAsync();

                _dbContext.Users.Remove(user);
                await _dbContext.SaveChangesAsync();
                await transaction.CommitAsync();

                return true;
            }
            catch (ValidationException)
            {
                await transaction.RollbackAsync();
                throw;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception($"Error deleting account: {ex.Message}", ex);
            }
        }

        public async Task<bool> ToggleAccountStatus(int userId, bool isActive)
        {
            var user = await _dbContext.Users.FindAsync(userId);
            if (user == null)
                return false;

            user.IsActive = isActive;
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<RoleDTO>> GetAllRoles()
        {
            var roles = await _dbContext.Roles.ToListAsync();
            return _mapper.Map<List<RoleDTO>>(roles);
        }

        public async Task<bool> AssignRole(int userId, int roleId)
        {
            var user = await _dbContext.Users
                .Include(u => u.Roles)
                .FirstOrDefaultAsync(u => u.UserId == userId);

            var role = await _dbContext.Roles.FindAsync(roleId);

            if (user == null || role == null)
                return false;

            if (!user.Roles.Any(r => r.RoleId == roleId))
            {
                user.Roles.Add(role);
                await _dbContext.SaveChangesAsync();
            }

            return true;
        }

        public async Task<bool> RemoveRole(int userId, int roleId)
        {
            var user = await _dbContext.Users
                .Include(u => u.Roles)
                .FirstOrDefaultAsync(u => u.UserId == userId);

            var role = await _dbContext.Roles.FindAsync(roleId);

            if (user == null || role == null)
                return false;

            if (user.Roles.Any(r => r.RoleId == roleId))
            {
                user.Roles.Remove(role);
                await _dbContext.SaveChangesAsync();
            }

            return true;
        }

        private string ConvertGender(string gender)
        {
            if (string.IsNullOrEmpty(gender))
                return "Nam"; 

            return gender.ToLower() switch
            {
                "male" => "Nam",
                "female" => "Nữ",
                _ => gender 
            };
        }

        private bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try
            {
                // Use built-in EmailAddressAttribute to validate
                return new System.ComponentModel.DataAnnotations.EmailAddressAttribute().IsValid(email);
            }
            catch
            {
                return false;
            }
        }
    }
}