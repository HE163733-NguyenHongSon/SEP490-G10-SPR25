namespace AppointmentSchedulingApp.Application.DTOs
{
    public class ChatMessageDto
    {
        public string UserId { get; set; }
        public string Message { get; set; }
        public DateTime Timestamp { get; set; }
    }

    public class ChatResponseDto
    {
        public string Message { get; set; }
        public string Source { get; set; } // "database" or "web"
        public DateTime Timestamp { get; set; }
    }

    public class ChatHistoryDto
    {
        public List<ChatMessageDto> Messages { get; set; }
        public List<ChatResponseDto> Responses { get; set; }
    }
} 