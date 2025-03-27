
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.Repositories;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Infrastructure.Helper;
using AutoMapper;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Oauth2.v2;
using Google.Apis.Oauth2.v2.Data;
using Google.Apis.Services;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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

namespace AppointmentSchedulingApp.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IGenericRepository<User> _userRepository;
        private readonly AppSettings _appSettings;
        public readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IRoleService _roleService;
        private readonly IEmailService _emailService;

        private readonly IMapper _mapper;


        public UserService(IGenericRepository<User> userRepository,
            IOptionsMonitor<AppSettings> optionsMonitor,
            UserManager<User> userManager,
            RoleManager<Role> roleManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IRoleService roleService,
            IEmailService emailService,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _appSettings = optionsMonitor.CurrentValue;
            _userManager = userManager;
            _roleManager = roleManager;
            _mapper = mapper;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleService = roleService;
            _emailService = emailService;
        }


        public string GenerateToken(UserDTO userDTO)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var secretKeyBytes = Encoding.UTF8.GetBytes(_appSettings.SecretKey);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userDTO.Name),
                new Claim(ClaimTypes.DateOfBirth,userDTO.Dob?.ToString("yyyy-MM-dd") ?? ""),
                new Claim(JwtRegisteredClaimNames.Email, userDTO.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.NameId, userDTO.UserId.ToString()),
                new Claim("PhoneNumber", userDTO.PhoneNumber),
                new Claim("UserName", userDTO.UserName),
                //new Claim(ClaimTypes.Role, userDTO.Role),
                //new Claim("UserName", user.UserName ),
                //new Claim("Id", user.UserId.ToString()),
                //new Claim("TokenId", Guid.NewGuid().ToString()),
            };
            foreach (var roleName in userDTO.RoleInformations)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, roleName.RoleName));
                authClaims.Add(new Claim("RoleId", roleName.RoleId));
            }

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(authClaims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes), SecurityAlgorithms.HmacSha512Signature),
                Issuer = _appSettings.Issuer,
                Audience = _appSettings.Audience,
            };

            var token = jwtTokenHandler.CreateToken(tokenDescription);
            var accessToken = jwtTokenHandler.WriteToken(token);

            return accessToken;
        }


        public async Task<UserDTO?> LoginUser(SignInDTO userLogin, StringBuilder message)
        {
            var user = await _userManager.FindByNameAsync(userLogin.UserName);
            var checkPassword = await _userManager.CheckPasswordAsync(user, userLogin.Password);
            if (user == null || !checkPassword)
            {
                message.Append("Invalid UserName/Password");
                return null;
            }
            if (checkLockoutAccount(user, message))
            {

                return null;
            }

            var result = await _signInManager.PasswordSignInAsync(userLogin.UserName, userLogin.Password, false, false);
            if (result.Succeeded)
            {
                var userDTO = new UserDTO
                {
                    //UserId = user.UserId,
                    Email = user.Email,
                    UserName = user.UserName,
                    //Name = user.Name,
                    //Role = user.Role,
                    PhoneNumber = user.Phone,
                    Gender = user.Gender,
                    Dob = user.Dob,
                    RoleInformations = await _roleService.GetRoleInformationsByUserId(user.UserId.ToString())

                };

                return userDTO;
            }
            message.Append("Invalid Username/Password");
            return null;
        }

        public async Task<IdentityResult?> RegisterPatient(RegistrationDTO registrationDTO)
        {

            var user = new User
            {
                //Name = registrationDTO.Name,
                UserName = registrationDTO.UserName,
                Email = registrationDTO.Email,
                //Password = registrationDTO.Password,
                Phone = registrationDTO.PhoneNumber,
                Gender = registrationDTO.Gender,
                Dob = registrationDTO.Dob,
                Address = registrationDTO.Address,
                //Role = registrationDTO.Role,
                CitizenId = registrationDTO.CitizenId,
                //TwoFactorEnabled = true,

            };
            //return await _userManager.CreateAsync(user, registrationDTO.Password);
            var result = await _userManager.CreateAsync(user, registrationDTO.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, AppRole.Patient);
                return result;
            }
            //if (result.Succeeded)
            //{
            //    Console.WriteLine("Tạo tài khoản thành công!");
            //}
            //else
            //{
            //    foreach (var error in result.Errors)
            //    {
            //        Console.WriteLine($"Lỗi: {error.Code} - {error.Description}");
            //    }
            //}
            return result;
        }



        public bool checkLockoutAccount(User user, StringBuilder message)
        {
            // Check if the account is locked out
            //if (user.LockoutEnd.HasValue && user.LockoutEnd.Value > DateTime.UtcNow)
            //{
            //    // Account is locked out
            //    message.Append("Account is locked out");
            //    return true;
            //}

            return false;
        }

        public async Task<bool> CheckValidExternalRegister(string roleName, StringBuilder message)
        {
            bool checkValid = false;
            try
            {
                _userManager.AddLoginAsync(null, null);
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
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return false;
            }
            return true;
        }


        public async Task<IdentityResult?> ExternalRegisterUser(Userinfo userInfo, string roleName)
        {
            try
            {
                var newUser = new User
                {
                    //Name = userInfo.GivenName ?? string.Empty,
                    Email = userInfo.Email,
                    UserName = userInfo.Email,
                    //TwoFactorEnabled = true,
                    Gender = userInfo.Gender,


                    //Gender = userInfo.Gender != null ? false : true,
                    //Image = userInfo.Picture,
                };
                var result = await _userManager.CreateAsync(newUser);
                if (result.Succeeded)
                {
                    result = await _userManager.AddToRoleAsync(newUser, roleName);
                    if (result.Succeeded)
                    {
                        var info = new UserLoginInfo(GoogleDefaults.AuthenticationScheme, userInfo.Id, userInfo.Name);
                        result = await _userManager.AddLoginAsync(newUser, info);
                        return result;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ExternalRegisterUser: {ex.Message}");
            }


            return null;
        }

        public async Task<UserDTO> GetUserDto(Userinfo userinfo)
        {
            var user = await _userManager.FindByEmailAsync(userinfo.Email);
            var userDTO = new UserDTO
            {
                UserId = user.UserId,
                //Name = user.Name,
                Email = user.Email,
                PhoneNumber = user.Phone,
                Gender = user.Gender,
                //Role = user.Role,
                RoleInformations = await _roleService.GetRoleInformationsByUserId(userinfo.Id)

            };
            return userDTO;
        }

        public async Task<User> GetUserById(int userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            return user;
        }

        public async Task<string?> ForgotPassword([Required] string email, HttpContext httpContext)
        {

            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                // Tạo nội dung email
                string resetPasswordLink = "https://localhost:7256"; // Đường dẫn cố định
                string emailContent = $@"
Mã token của bạn: {token}
Mã token này sẽ bị vô hiệu hóa sau 10 phút.

Click vào link này để đặt lại mật khẩu: {resetPasswordLink}";

                // Create the email message
                var message = new Message(
                    new string[] { user.Email! },
                    "Forgot Password",
                    emailContent
                );

                _emailService.SendEmail(message);
                return "Password reset email sent successfully.";
            }
            ;
            return null;

        }



        public async Task<bool> ValidateResetPasswordAsync(ResetPassword resetPassword, StringBuilder message)
        {
            bool IsValid = false;
            try
            {
                var user = await _userManager.FindByEmailAsync(resetPassword.Email);
                if (user == null)
                {
                    throw new Exception($"Email: {resetPassword.Email} is not registered in the system!");
                }
                else
                {
                    var isValidToken = await _userManager.VerifyUserTokenAsync(user, _userManager.Options.Tokens.PasswordResetTokenProvider, "ResetPassword", resetPassword.Token);
                    if (!isValidToken)
                    {
                        throw new Exception("Incorrect Token!");
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


        public async Task<IdentityResult> ResetPassword(ResetPassword resetPassword)
        {

            var user = await _userManager.FindByEmailAsync(resetPassword.Email);
            if (user != null)
            {
                var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
                if (!resetPassResult.Succeeded)
                {
                    return resetPassResult;
                }
                return resetPassResult;
            }
            return null; // tam thoi
        }

    }
}
