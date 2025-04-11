using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;

namespace AppointmentSchedulingApp.Application.Services
{
    public interface IChatService
    {
        Task<ChatResponseDto> ProcessMessage(ChatMessageDto message);
        Task<ChatHistoryDto> GetChatHistory(string userId);
    }
} 