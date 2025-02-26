using AppointmentSchedulingApp.Services.Services;
using AppointmentSchedulingApp.Services.DTOs;

using AppointmentSchedulingApp.Services.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace AppointmentSchedulingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
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
                    Message = "Invalid username/ password"
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
    }
}
