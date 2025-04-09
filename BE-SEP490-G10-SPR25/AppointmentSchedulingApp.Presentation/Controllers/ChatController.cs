using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.Services;
using AppointmentSchedulingApp.Application.DTOs;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;

        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] ChatMessageDto message)
        {
            var response = await _chatService.ProcessMessage(message);
            return Ok(response);
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetChatHistory(string userId)
        {
            var history = await _chatService.GetChatHistory(userId);
            return Ok(history);
        }
    }
} 