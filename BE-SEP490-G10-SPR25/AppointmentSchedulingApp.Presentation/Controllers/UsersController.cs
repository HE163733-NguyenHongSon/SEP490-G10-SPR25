using AppointmentSchedulingApp.Infrastructure.Helper;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using Google.Apis.Oauth2.v2.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Linq;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("Test")]
        public int testauthentication()
        {
            return 1;
        }

        // Public endpoint for user authentication
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Post([FromBody] SignInDTO signInDto)
        {
            try
            {
                Console.WriteLine($"Login attempt received for user: {signInDto.UserName}");
                
                // Validate request
                if (signInDto == null)
                {
                    return BadRequest(new ApiResponse
                    {
                        Success = false,
                        Message = "Invalid request format",
                    });
                }
                
                StringBuilder message = new StringBuilder();
                var user = await _userService.LoginUser(signInDto, message);

                if (user == null)
                {
                    Console.WriteLine($"Login failed for user: {signInDto.UserName}, message: {message}");
                    return Ok(new ApiResponse
                    {
                        Success = false,
                        Message = message.ToString()
                    });
                }
                else
                {
                    Console.WriteLine($"Login successful for user: {signInDto.UserName}");
                    var token = _userService.GenerateToken(user);
                    Console.WriteLine($"Token generated, length: {token.Length}");
                    
                    // Retrieve role information
                    var roles = user.Roles?.Select(r => r.RoleName).ToList() ?? new List<string>();
                    var primaryRole = roles.FirstOrDefault() ?? "Unknown";
                    
                    Console.WriteLine($"User primary role: {primaryRole}");
                    
                    // Return success with token and basic user info
                    return Ok(new ApiResponse
                    {
                        Success = true,
                        Message = "Authenticate Success",
                        Data = new
                        {
                            token = token,
                            user = new
                            {
                                userId = user.UserId,
                                userName = user.UserName,
                                email = user.Email,
                                role = primaryRole, // Primary role for simpler role-based routing
                                roles = roles // All roles for more granular permissions
                            }
                        }
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception during login: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                }
                
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = "Internal server error during login",
                    Data = string.Empty
                });
            }
        }

        [HttpPost("Login-Google/{roleName}")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginGoogle(string accessToken, string roleName)
        {
            accessToken = accessToken.Replace("AccessToken ", "");
            StringBuilder message = new StringBuilder();
            var checkValid = await _userService.CheckValidExternalRegister(roleName, message);
            if (!checkValid)
            {
                return Ok(new ApiResponse()
                {
                    Success = checkValid,
                    Message = message.ToString()
                });
            }
            Userinfo userInfo = await _userService.GetUserInfoAsync(accessToken);
            if (userInfo == null)
            {
                return Ok(new ApiResponse()
                {
                    Success = false,
                    Message = "Login with Google Fails, No access to account!"
                });
            }
            var checkAccountExist = await _userService.CheckGoogleExistAccount(userInfo.Email);
            if (!checkAccountExist)
            {
                var result = await _userService.ExternalRegisterUser(userInfo, roleName);
                if (result == null || !result.Succeeded)
                {
                    return Ok(new ApiResponse()
                    {
                        Success = false,
                        Message = "Login with Google Fails, No access to account!"
                    });
                }
            }
            UserDTO userDTO = await _userService.GetUserDto(userInfo);
            var user = await _userService.GetUserById(userDTO.UserId);
            var checkIsLockout = _userService.checkLockoutAccount(user, message);
            if (!checkIsLockout)
            {
                message.Append("Google Authentication Success!");
            }

            return Ok(new ApiResponse
            {
                Success = !checkIsLockout,
                Message = message.ToString(),
                Data = !checkIsLockout ? _userService.GenerateToken(userDTO) : null
            });
        }

        [HttpPost("Register-Patient")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterPatient(RegistrationDTO registrationDTO)
        {
            // Kiểm tra ModelState trước khi xử lý
            if (!ModelState.IsValid)
            {
                var modelErrors = ModelState
                    .Where(x => x.Value.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                    );
                
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "Dữ liệu không hợp lệ",
                    Errors = modelErrors
                });
            }
            
            var result = await _userService.RegisterPatient(registrationDTO);
            if (result == null || !result.Succeeded)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = result?.Message ?? "Đăng ký không thành công",
                    Errors = result?.Errors
                });
            }
            else
            {
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Đăng ký thành công",
                });
            }
        }

        [HttpPost("ForgotPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([Required] string email)
        {
            var user = await _userService.ForgotPassword(email, HttpContext);
            if (user == null)
            {
                return Ok(new
                {
                    Success = false,
                    Message = "Could not send link to email. Email is not registered, or you have entered the wrong email address"
                });
            }
            else
            {
                return Ok(new
                {
                    Success = true,
                    Message = " Password Changed request is sent on Email . Please Open your email & click the link.",
                });
            }
        }
        
        [HttpGet("reset-password")]
        [AllowAnonymous]
        public IActionResult ResetPassword(string token, string email)
        {
            var model = new ResetPassword { Token = token, Email = email };

            return Ok(new
            {
                model
            });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPassword([Required] ResetPassword resetPassword)
        {
            StringBuilder stringBuilderMessage = new StringBuilder();
            bool checkValidateProject = await _userService.ValidateResetPasswordAsync(resetPassword, stringBuilderMessage);
            if (!checkValidateProject)
            {
                return Ok(new
                {
                    Success = false,
                    Message = stringBuilderMessage.ToString()
                });
            }

            var result = await _userService.ResetPassword(resetPassword);
            if (result == null || !result.Succeeded)
            {
                return Ok(new
                {
                    Success = false,
                    Message = "Reset password failed",
                    Errors = result?.Errors
                });
            }
            
            return Ok(new
            {
                Success = true,
                Message = "Password has been changed."
            });
        }

        // Example of a protected endpoint using role-based authorization
        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetUserProfile()
        {
            try
            {
                // Get the user ID from the claims
                var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new ApiResponse
                    {
                        Success = false,
                        Message = "User not authenticated",
                    });
                }
                
                var user = await _userService.GetUserById(int.Parse(userId));
                
                if (user == null)
                {
                    return NotFound(new ApiResponse
                    {
                        Success = false,
                        Message = "User not found",
                    });
                }
                
                // Map user to DTO or return required fields
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "User profile retrieved successfully",
                    Data = new
                    {
                        user.UserId,
                        user.UserName,
                        user.Email,
                        user.Phone,
                        user.Gender,
                        user.Dob,
                        user.Address,
                        user.AvatarUrl
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Message = $"Error retrieving user profile: {ex.Message}",
                });
            }
        }

        // Example of admin-only endpoint using policy instead of direct role attribute
        [HttpGet("all")]
        [Authorize(Policy = "RequireAdminRole")]
        public IActionResult GetAllUsers()
        {
            // This would be implemented in an actual admin controller
            return Ok(new ApiResponse
            {
                Success = true,
                Message = "This is an admin-only endpoint",
            });
        }

        // Example for doctor-only endpoint using policy
        [HttpGet("doctor-only")]
        [Authorize(Policy = "RequireDoctorRole")]
        public IActionResult DoctorOnly()
        {
            return Ok(new ApiResponse
            {
                Success = true,
                Message = "This is a doctor-only endpoint",
            });
        }

        // Example for receptionist-only endpoint using policy
        [HttpGet("receptionist-only")]
        [Authorize(Policy = "RequireReceptionistRole")]
        public IActionResult ReceptionistOnly()
        {
            return Ok(new ApiResponse
            {
                Success = true,
                Message = "This is a receptionist-only endpoint",
            });
        }

        // Example for patient-only endpoint using policy
        [HttpGet("patient-only")]
        [Authorize(Policy = "RequirePatientRole")]
        public IActionResult PatientOnly()
        {
            return Ok(new ApiResponse
            {
                Success = true,
                Message = "This is a patient-only endpoint",
            });
        }

        // Example for guardian-only endpoint using policy
        [HttpGet("guardian-only")]
        [Authorize(Policy = "RequireGuardianRole")]
        public IActionResult GuardianOnly()
        {
            return Ok(new ApiResponse
            {
                Success = true,
                Message = "This is a guardian-only endpoint",
            });
        }
    }
}