using AppointmentSchedulingApp.Infrastructure.Helper;
using AppointmentSchedulingApp.Services.DTOs;
using AppointmentSchedulingApp.Services.IServices;
using Google.Apis.Oauth2.v2.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AppointmentSchedulingApp.API.Controllers
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
        [Authorize(Roles = "Patient")]
        public int testauthentication()
        {
            return 1;
        }

        [HttpPost("login")]
        //public async Task<IActionResult> Login(SignInDTO signInDto)
        public async Task<IActionResult> Post([FromBody] SignInDTO signInDto)
        {
            StringBuilder message = new StringBuilder();
            var user = await _userService.LoginUser(signInDto, message);

            if (user == null)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "Invalid UserName/ password"
                });
            }
            else
            {
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Authenticate Success",
                    Data = _userService.GenerateToken(user)
                });
            }
        }


        [HttpPost("Login-Google/{roleName}")]
        //public async Task<IActionResult> LoginGoogle([FromHeader(Name = "Authorization")] string accessToken, string roleName)
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
                var checkSuccessCreate = await _userService.ExternalRegisterUser(userInfo, roleName);
                if (checkSuccessCreate == null || !checkSuccessCreate.Succeeded)
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
        public async Task<IActionResult> RegisterPatient(RegistrationDTO registrationDTO)
        {
            var user = await _userService.RegisterPatient(registrationDTO);
            if (user == null)
            {
                return Ok(new
                {
                    Success = false,
                    Message = "Register Failed"
                });
            }
            else
            {
                return Ok(new
                {
                    Success = true,
                    Message = "Register Success",
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
        public async Task<IActionResult> ResetPassword(string token, string email)
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

            var user = await _userService.ResetPassword(resetPassword);
            {
                return Ok(new
                {
                    Success = true,
                    Message = "Password has been changed.",
                });
            }
        }

    }
}
