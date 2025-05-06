using Microsoft.AspNetCore.SignalR;
using AppointmentSchedulingApp.Application.DTOs;
using Microsoft.Extensions.Logging;

namespace AppointmentSchedulingApp.Presentation.Hubs
{
    public class NotificationHub : Hub
    {

        private readonly ILogger<NotificationHub> _logger;

        public NotificationHub(ILogger<NotificationHub> logger)
        {
            _logger = logger;
        }

        public override async Task OnConnectedAsync()
        {
            _logger.LogInformation($"Client connected: {Context.ConnectionId}");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            _logger.LogInformation($"Client disconnected: {Context.ConnectionId}, Error: {exception?.Message ?? "None"}");
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendCancellationNotification(CancellationNotificationDTO notification)
        {
            _logger.LogInformation($"[NotificationHub] Sending cancellation notification for reservation ID: {notification.ReservationId}");
            
            // Gửi thông báo hủy lịch đến tất cả client (lễ tân)
            await Clients.All.SendAsync("ReceiveCancellationNotification", notification);
        }
    }
} 
