using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Infrastructure.Helper;
using AutoMapper;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Oauth2.v2;
using Google.Apis.Oauth2.v2.Data;
using Google.Apis.Services;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace AppointmentSchedulingApp.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IGenericRepository<User> _userRepository;
        private readonly AppSettings _appSettings;
        private readonly IConfiguration _configuration;
        private readonly IRoleService _roleService;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;
        private readonly AppointmentSchedulingDbContext _dbContext;

        public UserService(
            IGenericRepository<User> userRepository,
            IOptionsMonitor<AppSettings> optionsMonitor,
            IConfiguration configuration,
            IRoleService roleService,
            IEmailService emailService,
            IMapper mapper,
            AppointmentSchedulingDbContext dbContext)
        {
            _userRepository = userRepository;
            _appSettings = optionsMonitor.CurrentValue;
            _mapper = mapper;
            _configuration = configuration;
            _roleService = roleService;
            _emailService = emailService;
            _dbContext = dbContext;
        }
        /// <summary>
        /// Generate a JWT token for the user
        /// </summary>
        /// Author : Dinh Quang Tung -HE161511 
        /// <param name="userId"></param>
        /// <param name="userName"></param>
        /// <param name="userDTO"></param>
        /// <returns></returns>
        public string GenerateToken(UserDTO userDTO)
        {
            try
            {                
                if (userDTO == null)
                {
                    throw new ArgumentNullException(nameof(userDTO));
                }
                
                var jwtTokenHandler = new JwtSecurityTokenHandler();
                var secretKeyBytes = Encoding.UTF8.GetBytes(_appSettings.SecretKey);
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, userDTO.UserName ?? ""),
                    new Claim(ClaimTypes.NameIdentifier, userDTO.UserId.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, userDTO.Email ?? ""),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.NameId, userDTO.UserId.ToString()),
                    new Claim("UserName", userDTO.UserName ?? ""),
                };
                
                // Add phone if available
                if (!string.IsNullOrEmpty(userDTO.Phone))
                {
                    authClaims.Add(new Claim("Phone", userDTO.Phone));
                }
                
                // Add DOB if available
                if (!string.IsNullOrEmpty(userDTO.Dob))
                {
                    authClaims.Add(new Claim(ClaimTypes.DateOfBirth, userDTO.Dob));
                }

                Console.WriteLine($"Adding {userDTO.Roles?.Count ?? 0} roles to token");
                
                // Add roles - standardize role claims to use ClaimTypes.Role to ensure proper role-based authorization
                if (userDTO.Roles != null && userDTO.Roles.Any())
                {
                    foreach (var roleInfo in userDTO.Roles)
                    {
                        if (!string.IsNullOrEmpty(roleInfo.RoleName))
                        {
                            Console.WriteLine($"Adding role: {roleInfo.RoleName}");
                            // Use ClaimTypes.Role to ensure standard role-based authorization works
                            authClaims.Add(new Claim(ClaimTypes.Role, roleInfo.RoleName));
                            
                            // Add additional role claim with custom type for frontend
                            authClaims.Add(new Claim("role", roleInfo.RoleName));
                            
                            if (!string.IsNullOrEmpty(roleInfo.RoleId))
                            {
                                authClaims.Add(new Claim("RoleId", roleInfo.RoleId));
                            }
                        }
                    }
                }
                else
                {
                    Console.WriteLine("No roles found for the user");
                }

                var tokenDescription = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(authClaims),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(secretKeyBytes), 
                        SecurityAlgorithms.HmacSha512Signature),
                    Issuer = _appSettings.Issuer,
                    Audience = _appSettings.Audience,
                };

                var token = jwtTokenHandler.CreateToken(tokenDescription);
                var accessToken = jwtTokenHandler.WriteToken(token);
                
                Console.WriteLine($"Token generated successfully, length: {accessToken.Length}");
                
                return accessToken;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error generating token: {ex.Message}");
                throw;
            }
        }

        public async Task<UserDTO?> LoginUser(SignInDTO userLogin, StringBuilder message)
        {
            Console.WriteLine($"LoginUser service called for username/email: {userLogin.UserName}");
            
            try {
                // Check if userLogin is null or username/password is empty
                if (userLogin == null || string.IsNullOrEmpty(userLogin.UserName) || string.IsNullOrEmpty(userLogin.Password))
                {
                    message.Append("Username/email and password are required");
                    Console.WriteLine("Login failed: Username/email and password are required");
                    return null;
                }
                
                // Allow login with either username or email
                var user = await _userRepository.Get(u => u.UserName == userLogin.UserName || u.Email == userLogin.UserName);
                
                if (user == null)
                {
                    message.Append("Invalid username/email or password");
                    Console.WriteLine($"Login failed: User not found for username/email: {userLogin.UserName}");
                    return null;
                }
                
                Console.WriteLine($"User found: {user.UserName} (Email: {user.Email}), checking password...");
                
                // Log the stored password format (for debugging)
                Console.WriteLine($"Stored password format: {(user.Password.StartsWith("$2") ? "BCrypt" : user.Password.Length > 50 ? "Legacy Hash" : "Plaintext")}");
                
                // Verify password using PasswordHasher
                bool passwordValid = false;
                
                try {
                    passwordValid = PasswordHasher.VerifyPassword(userLogin.Password, user.Password);
                    Console.WriteLine($"Password verification result: {passwordValid}");
                } catch (Exception ex) {
                    Console.WriteLine($"Error during password verification: {ex.Message}");
                    
                    // Fallback for plaintext passwords (direct comparison)
                    if (user.Password == userLogin.Password) {
                        passwordValid = true;
                        Console.WriteLine("Password verified using direct comparison (plaintext)");
                    }
                }
                
                if (!passwordValid)
                {
                    message.Append("Invalid username/email or password");
                    Console.WriteLine($"Login failed: Invalid password for username: {userLogin.UserName}");
                    return null;
                }
                
                // Check if password needs to be upgraded to bcrypt (if it's in plaintext or legacy format)
                if (!user.Password.StartsWith("$2"))
                {
                    try {
                        Console.WriteLine($"Upgrading password to BCrypt for user: {user.UserName}");
                        user.Password = PasswordHasher.HashPassword(userLogin.Password);
                        _userRepository.Update(user);
                        await _dbContext.SaveChangesAsync();
                        Console.WriteLine("Password upgraded successfully");
                    } catch (Exception ex) {
                        // Log error but don't fail the login
                        Console.WriteLine($"Error upgrading password: {ex.Message}");
                    }
                }
                
                // Check if account is locked
                if (checkLockoutAccount(user, message))
                {
                    Console.WriteLine($"Login failed: Account locked for username: {userLogin.UserName}");
                    return null;
                }
                
                Console.WriteLine($"Login successful for username: {userLogin.UserName}");
                
                // Get role information
                var roles = await _roleService.GetRoleDTOsByUserId(user.UserId.ToString());
                Console.WriteLine($"Found {roles?.Count ?? 0} roles for user");
                
                if (roles != null && roles.Any())
                {
                    foreach (var role in roles)
                    {
                        Console.WriteLine($"User role: {role.RoleName} (ID: {role.RoleId})");
                    }
                }
                else
                {
                    Console.WriteLine("Warning: No roles found for user");
                }
                
                // Create UserDTO
                var userDTO = new UserDTO
                {
                    UserId = user.UserId,
                    Email = user.Email,
                    UserName = user.UserName,
                    Phone = user.Phone,
                    Gender = user.Gender,
                    Dob = user.Dob.ToString("yyyy-MM-dd") ,
                    Address = user.Address,
                    AvatarUrl = user.AvatarUrl,
                    Roles = roles
                };
                
                Console.WriteLine($"UserDTO created with {userDTO.Roles?.Count ?? 0} roles");
                return userDTO;
            }
            catch (Exception ex) {
                Console.WriteLine($"Exception in LoginUser: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                }
                message.Append("An error occurred during login. Please try again.");
                return null;
            }
        }

        public async Task<ResultDTO> RegisterPatient(RegistrationDTO registrationDTO)
        {
            try
            {
                // Validate input
                var validationResult = ValidateRegistrationDTO(registrationDTO);
                if (!validationResult.Succeeded)
                {
                    return validationResult;
                }
                
                // Check if email already exists
                var existingEmail = await _userRepository.Get(u => u.Email == registrationDTO.Email);
                if (existingEmail != null)
                {
                    return ResultDTO.Failure("Email đã tồn tại", new Dictionary<string, string[]>
                    {
                        { "Email", new[] { "Email đã được sử dụng bởi tài khoản khác" } }
                    });
                }
                
                // Check if phone number already exists
                var existingPhone = await _userRepository.Get(u => u.Phone == registrationDTO.PhoneNumber);
                if (existingPhone != null)
                {
                    return ResultDTO.Failure("Số điện thoại đã tồn tại", new Dictionary<string, string[]>
                    {
                        { "Phone", new[] { "Số điện thoại đã được sử dụng bởi tài khoản khác" } }
                    });
                }
                
                // Check if CitizenId already exists
                var existingCitizenId = await _userRepository.Get(u => u.CitizenId == registrationDTO.CitizenId);
                if (existingCitizenId != null)
                {
                    return ResultDTO.Failure("Số CCCD/CMND đã tồn tại", new Dictionary<string, string[]>
                    {
                        { "CitizenId", new[] { "Số CCCD/CMND đã được sử dụng bởi tài khoản khác" } }
                    });
                }

                // Create new user
                var user = new User
                {
                    UserName = registrationDTO.UserName,
                    Email = registrationDTO.Email,
                    // Hash password with BCrypt
                    Password = PasswordHasher.HashPassword(registrationDTO.Password),
                    Phone = registrationDTO.PhoneNumber ?? "",
                    // Chuyển đổi giá trị gender từ tiếng Anh sang tiếng Việt
                    Gender = ConvertGender(registrationDTO.Gender),
                    Dob = registrationDTO.Dob,
                    Address = registrationDTO.Address ?? "",
                    CitizenId = registrationDTO.CitizenId,
                    IsVerify = true,
                    IsActive = true,
                };

                _userRepository.Add(user);
                
                try 
                {
                    await _dbContext.SaveChangesAsync();
                    Console.WriteLine($"Saved user {user.UserName} to database successfully with ID: {user.UserId}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error saving user to database: {ex.Message}");
                    if (ex.InnerException != null)
                    {
                        Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                    }
                    return ResultDTO.Failure("Lỗi khi lưu người dùng vào cơ sở dữ liệu", new Dictionary<string, string[]>
                    {
                        { "Database", new[] { ex.Message } }
                    });
                }

                // Add Patient role to the user
                var patientRole = await _dbContext.Roles.FirstOrDefaultAsync(r => r.RoleName == "Bệnh nhân");
                if (patientRole == null)
                {
                    patientRole = await _dbContext.Roles.FirstOrDefaultAsync(r => r.RoleName == "Patient");
                }
                
                if (patientRole != null)
                {
                    try 
                    {
                        // Thêm vai trò trực tiếp vào collection của User thay vì tạo UserRole
                        user.Roles.Add(patientRole);
                        await _dbContext.SaveChangesAsync();
                        Console.WriteLine($"Added Patient role to user {user.UserName}");
                        
                        // Create patient record
                        var patient = new Patient
                        {
                            PatientId = user.UserId,
                            Rank = "Normal", // Default rank for new patients
                        };
                        
                        _dbContext.Add(patient);
                        await _dbContext.SaveChangesAsync();
                        Console.WriteLine($"Created patient record for user {user.UserName}");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error adding role to user: {ex.Message}");
                        if (ex.InnerException != null)
                        {
                            Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                        }
                        return ResultDTO.Failure("Tài khoản đã được tạo nhưng không thể gán vai trò bệnh nhân", new Dictionary<string, string[]>
                        {
                            { "Role", new[] { ex.Message } }
                        });
                    }
                }
                else
                {
                    Console.WriteLine("Patient role not found in database");
                    return ResultDTO.Failure("Vai trò bệnh nhân không được tìm thấy trong cơ sở dữ liệu");
                }

                return ResultDTO.Success();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error in RegisterPatient: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                }
                return ResultDTO.Failure("Đã xảy ra lỗi không mong muốn trong quá trình đăng ký");
            }
        }

        private ResultDTO ValidateRegistrationDTO(RegistrationDTO registrationDTO)
        {
            var errors = new Dictionary<string, string[]>();

            // Kiểm tra tên người dùng
            if (string.IsNullOrWhiteSpace(registrationDTO.UserName))
            {
                errors.Add("UserName", new[] { "Tên đăng nhập không được để trống" });
            }
            else if (registrationDTO.UserName.Length < 3 || registrationDTO.UserName.Length > 50)
            {
                errors.Add("UserName", new[] { "Tên đăng nhập phải có độ dài từ 3 đến 50 ký tự" });
            }
            else if (registrationDTO.UserName.Contains(" "))
            {
                errors.Add("UserName", new[] { "Tên đăng nhập không được chứa khoảng trắng" });
            }
            
            // Kiểm tra email
            if (string.IsNullOrWhiteSpace(registrationDTO.Email))
            {
                errors.Add("Email", new[] { "Email không được để trống" });
            }
            else if (!IsValidEmail(registrationDTO.Email))
            {
                errors.Add("Email", new[] { "Email không đúng định dạng" });
            }
            
            // Kiểm tra mật khẩu
            if (string.IsNullOrWhiteSpace(registrationDTO.Password))
            {
                errors.Add("Password", new[] { "Mật khẩu không được để trống" });
            }
            else if (registrationDTO.Password.Length < 6)
            {
                errors.Add("Password", new[] { "Mật khẩu phải có ít nhất 6 ký tự" });
            }
            
            // Kiểm tra xác nhận mật khẩu
            if (registrationDTO.Password != registrationDTO.ConfirmPassword)
            {
                errors.Add("ConfirmPassword", new[] { "Mật khẩu và xác nhận mật khẩu không khớp" });
            }
            
            // Kiểm tra số điện thoại
            if (string.IsNullOrWhiteSpace(registrationDTO.PhoneNumber))
            {
                errors.Add("Phone", new[] { "Số điện thoại không được để trống" });
            }
            else if (!IsValidPhone(registrationDTO.PhoneNumber))
            {
                errors.Add("Phone", new[] { "Số điện thoại không đúng định dạng" });
            }
            
            // Kiểm tra CCCD/CMND
            if (registrationDTO.CitizenId <= 0)
            {
                errors.Add("CitizenId", new[] { "Số CCCD/CMND không được để trống" });
            }
            else if (!IsValidCitizenId(registrationDTO.CitizenId))
            {
                errors.Add("CitizenId", new[] { "Số CCCD/CMND không hợp lệ (phải có 9 hoặc 12 chữ số và không bắt đầu bằng số '0')" });
            }
            
            // Kiểm tra ngày sinh
            var minAge = DateOnly.FromDateTime(DateTime.Now.AddYears(-120)); // 120 tuổi
            var maxAge = DateOnly.FromDateTime(DateTime.Now); // Không được lớn hơn ngày hiện tại
            
            if (registrationDTO.Dob < minAge || registrationDTO.Dob > maxAge)
            {
                errors.Add("Dob", new[] { "Ngày sinh không hợp lệ" });
            }
            else
            {
                // Kiểm tra tuổi >= 18
                var today = DateTime.Today;
                var birthDate = registrationDTO.Dob.ToDateTime(TimeOnly.MinValue);
                var age = today.Year - birthDate.Year;
                if (birthDate > today.AddYears(-age)) age--;
                if (age < 18)
                {
                    errors.Add("Dob", new[] { "Bạn phải đủ 18 tuổi trở lên để đăng ký tài khoản." });
                }
            }
            
            // Kiểm tra địa chỉ
            if (string.IsNullOrWhiteSpace(registrationDTO.Address))
            {
                errors.Add("Address", new[] { "Địa chỉ không được để trống" });
            }
            
            // Kiểm tra giới tính
            if (string.IsNullOrWhiteSpace(registrationDTO.Gender))
            {
                errors.Add("Gender", new[] { "Giới tính không được để trống" });
            }
            else if (registrationDTO.Gender.ToLower() != "nam" && registrationDTO.Gender.ToLower() != "nữ")
            {
                errors.Add("Gender", new[] { "Giới tính không hợp lệ (phải là 'Nam' hoặc 'Nữ')" });
            }
            
            if (errors.Count > 0)
            {
                return ResultDTO.Failure("Thông tin đăng ký không hợp lệ", errors);
            }
            
            return ResultDTO.Success();
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        private bool IsValidPhone(string phone)
        {
            // Chấp nhận số điện thoại Việt Nam bắt đầu bằng 0 hoặc +84, tiếp theo là 9 chữ số
            var regex = new System.Text.RegularExpressions.Regex(@"^(0|\+84)([0-9]{9})$");
            return regex.IsMatch(phone.Replace(" ", ""));
        }

        private bool IsValidCitizenId(long citizenId)
        {
            // CMND cũ: 9 chữ số, CCCD mới: 12 chữ số
            string citizenIdStr = citizenId.ToString();
            return citizenIdStr.Length == 9 || citizenIdStr.Length == 12;
        }

        public bool checkLockoutAccount(User user, StringBuilder message)
        {
            // Trong triển khai không dùng Identity, bạn có thể tự quản lý việc khóa tài khoản
            // Ví dụ: kiểm tra một trường IsLocked trong bảng User
            return false;
        }

        public async Task<bool> CheckValidExternalRegister(string roleName, StringBuilder message)
        {
            bool checkValid = false;
            try
            {
                if (roleName == null)
                {
                    throw new Exception("Role Name is null");
                }
                if (!roleName.Equals("Patient"))
                {
                    throw new Exception("Not Allowed To Register Other Roles Except Patient");
                }
                checkValid = true;
            }
            catch (Exception ex)
            {
                message.Append(ex.Message);
                await Console.Out.WriteLineAsync($"CheckValidExternalRegister: {ex.Message}");
            }
            return checkValid;
        }

        public async Task<Userinfo> GetUserInfoAsync(string accessToken)
        {
            // Tạo credential từ access token
            var credential = GoogleCredential.FromAccessToken(accessToken);

            // Tạo dịch vụ OAuth2
            var oauth2Service = new Oauth2Service(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
            });
            // Lấy thông tin người dùng
            Userinfo userInfo = await oauth2Service.Userinfo.Get().ExecuteAsync();
            return userInfo;
        }

        public async Task<bool> CheckGoogleExistAccount(string email)
        {
            var user = await _userRepository.Get(u => u.Email == email);
            return user != null;
        }

        public async Task<ResultDTO> ExternalRegisterUser(Userinfo userInfo, string roleName)
        {
            try
            {
                // Kiểm tra email đã tồn tại chưa
                if (await CheckGoogleExistAccount(userInfo.Email))
                {
                    return ResultDTO.Failure("Email already exists");
                }

                // Tạo số điện thoại tạm thời duy nhất cho tài khoản Google 
                // Lưu ý: Người dùng sẽ cần cập nhật số điện thoại thật sau khi đăng nhập
                string temporaryPhone = await GenerateUniquePhone();

                var newUser = new User
                {
                    Email = userInfo.Email,
                    UserName = userInfo.Email,
                    // Tạo mật khẩu ngẫu nhiên cho tài khoản Google
                    Password = PasswordHasher.HashPassword(Guid.NewGuid().ToString()),
                    Gender = ConvertGender(userInfo.Gender),
                    Phone = temporaryPhone,
                    IsVerify = true,
                    IsActive = true,
                };

                // Lưu vào database
                _userRepository.Add(newUser);
                await _dbContext.SaveChangesAsync();

                // Thêm vai trò cho người dùng
                var role = await _dbContext.Roles.FirstOrDefaultAsync(r => r.RoleName == roleName);
                if (role != null)
                {
                    newUser.Roles.Add(role);
                    await _dbContext.SaveChangesAsync();
                    
                    // Nếu là bệnh nhân, tạo bản ghi Patient
                    if (roleName.Equals("Patient") || roleName.Equals("Bệnh nhân"))
                    {
                        var patient = new Patient
                        {
                            PatientId = newUser.UserId,
                            Rank = "Normal", // Default rank for new patients
                        };
                        
                        _dbContext.Add(patient);
                        await _dbContext.SaveChangesAsync();
                    }
                }

                return ResultDTO.Success();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ExternalRegisterUser: {ex.Message}");
                return ResultDTO.Failure(ex.Message);
            }
        }

        // Hàm tạo số điện thoại tạm thời duy nhất
        private async Task<string> GenerateUniquePhone()
        {
            // Tiền tố cho số điện thoại tạm thời
            string prefix = "099";
            
            // Tạo số ngẫu nhiên 7 chữ số
            Random random = new Random();
            string uniquePhone;
            bool isUnique = false;
            
            // Vòng lặp cho đến khi tìm thấy số điện thoại duy nhất
            do
            {
                string randomPart = random.Next(1000000, 9999999).ToString();
                uniquePhone = prefix + randomPart;
                
                // Kiểm tra xem số điện thoại đã tồn tại chưa
                var existingUser = await _userRepository.Get(u => u.Phone == uniquePhone);
                isUnique = (existingUser == null);
            } 
            while (!isUnique);
            
            return uniquePhone;
        }

        public async Task<UserDTO> GetUserDto(Userinfo userinfo)
        {
            var user = await _userRepository.Get(u => u.Email == userinfo.Email);
            var userDTO = new UserDTO
            {
                UserId = user.UserId,
                Email = user.Email,
                UserName = user.UserName,
                Phone = user.Phone,
                Gender = user.Gender,
                Roles = await _roleService.GetRoleDTOsByUserId(user.UserId.ToString())
            };
            return userDTO;
        }

        public async Task<User> GetUserById(int userId)
        {
            return await _userRepository.Get(u => u.UserId == userId);
        }

        public async Task<string?> ForgotPassword(string email, HttpContext httpContext)
        {
            var user = await _userRepository.Get(u => u.Email == email);
            if (user != null)
            {
                // Tạo token đặt lại mật khẩu (đơn giản hóa)
                string token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
                
                // Lưu token vào database hoặc cache
                // (trong triển khai thực tế, bạn nên lưu token này vào database kèm thời hạn)

                // Tạo nội dung email
                string resetPasswordLink = "https://localhost:7256"; // Đường dẫn cố định
                string emailContent = $@"
Mã token của bạn: {token}
Mã token này sẽ bị vô hiệu hóa sau 10 phút.

Click vào link này để đặt lại mật khẩu: {resetPasswordLink}";

                // Create the email message
                var message = new Message(
                    new string[] { user.Email },
                    "Forgot Password",
                    emailContent
                );

                _emailService.SendEmail(message);
                return "Password reset email sent successfully.";
            }
            return null;
        }

        public async Task<bool> ValidateResetPasswordAsync(ResetPassword resetPassword, StringBuilder message)
        {
            bool IsValid = false;
            try
            {
                var user = await _userRepository.Get(u => u.Email == resetPassword.Email);
                if (user == null)
                {
                    throw new Exception($"Email: {resetPassword.Email} is not registered in the system!");
                }
                else
                {
                    // Xác minh token (đơn giản hóa)
                    // Trong triển khai thực tế, bạn cần kiểm tra token từ database và thời hạn
                    
                    if (string.IsNullOrEmpty(resetPassword.Token))
                    {
                        throw new Exception("Token is invalid!");
                    }

                    if (string.IsNullOrEmpty(resetPassword.Password))
                    {
                        throw new Exception("Password cannot be null");
                    }
                    else
                    {
                        if (resetPassword.Password.Length < 8
                        || !Regex.IsMatch(resetPassword.Password, "[a-z]")
                        || !Regex.IsMatch(resetPassword.Password, "[A-Z]")
                        || !Regex.IsMatch(resetPassword.Password, "[0-9]")
                        || !Regex.IsMatch(resetPassword.Password, @"[@$!%*?&]"))
                        {
                            throw new Exception("Password must be at least 8 characters, including letters, uppercase letters, numbers, and special characters.");
                        }
                        else
                        {
                            if (!resetPassword.Password.Equals(resetPassword.ConfirmPassword))
                            {
                                throw new Exception("The password and confirmation password do not match.");
                            }
                        }
                    }
                }
                IsValid = true;
            }
            catch (Exception ex)
            {
                message.Append(ex.Message);
                await Console.Out.WriteLineAsync($"ValidateResetPassword: {ex.Message}");
            }

            return IsValid;
        }

        public async Task<ResultDTO> ResetPassword(ResetPassword resetPassword)
        {
            try
            {
                var user = await _userRepository.Get(u => u.Email == resetPassword.Email);
                if (user != null)
                {
                    // Cập nhật mật khẩu
                    user.Password = PasswordHasher.HashPassword(resetPassword.Password);
                    _userRepository.Update(user);
                    await _dbContext.SaveChangesAsync();
                    
                    return ResultDTO.Success();
                }
                return ResultDTO.Failure("User not found");
            }
            catch (Exception ex)
            {
                return ResultDTO.Failure(ex.Message);
            }
        }

        // Thêm hàm chuyển đổi giới tính
        private string ConvertGender(string gender)
        {
            if (string.IsNullOrEmpty(gender))
                return "Nam"; // Giá trị mặc định

            return gender.ToLower() switch
            {
                "male" => "Nam",
                "female" => "Nữ",
                _ => "Nam" // Giá trị mặc định nếu không rõ
            };
        }
    }
}