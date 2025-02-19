using AppointmentSchedulingApp.Domain.Contracts.Services;
using AppointmentSchedulingApp.Domain.DTOs;

using AppointmentSchedulingApp.Services.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace AppointmentSchedulingApp.Server.Controllers
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

        [HttpPost("login")]
        public async Task<IActionResult> Login(SignInDTO signInDto)
        {
            StringBuilder message = new StringBuilder();
            var user = await _userService.LoginUser(signInDto, message);

            if (user == null)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "Invalid phone/ password"
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

        // Login v1

        //[HttpPost("login")]
        //public async Task<IActionResult> Login(SignInDTO signInDto)
        //{
        //    var message = new StringBuilder();
        //    var user = await _userService.LoginUser(signInDto, message);

        //    if (user == null)
        //    {
        //        return BadRequest(new { Message = message.ToString() });
        //    }

        //    return Ok(user);
        //}
        //cmt

        // thu commit tren github déktop

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegistrationDTO registrationDto)
        {
            StringBuilder message = new StringBuilder();
            var user = await _userService.RegisterUser(registrationDto, message);

            if (user == null)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = message.ToString()
                });
            }

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Registration Successful",
                Data = user
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
    }
}
