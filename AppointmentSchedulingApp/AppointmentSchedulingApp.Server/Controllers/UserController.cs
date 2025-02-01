using AppointmentSchedulingApp.Domain.Contracts.Services;
using AppointmentSchedulingApp.Domain.DTOs;
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
            var message = new StringBuilder();
            var user = await _userService.LoginUser(signInDto, message);

            if (user == null)
            {
                return BadRequest(new { Message = message.ToString() });
            }

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegistrationDTO registrationDto)
        {
            var message = new StringBuilder();
            var user = await _userService.RegisterUser(registrationDto, message);

            if (user == null)
            {
                return BadRequest(new { Message = message.ToString() });
            }

            return Ok(user);
        }
    }
}
