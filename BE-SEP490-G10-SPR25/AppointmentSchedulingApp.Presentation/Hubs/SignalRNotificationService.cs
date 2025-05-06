using Microsoft.AspNetCore.SignalR;
using AppointmentSchedulingApp.Application.IServices;

namespace AppointmentSchedulingApp.Presentation.Hubs;

public class SignalRNotificationService : INotificationService
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public SignalRNotificationService(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task NotifyScheduleConflictAsync(string userId, string message)
    {
        await _hubContext.Clients.User(userId)
            .SendAsync("ScheduleConflict", new { message });
    }
}
