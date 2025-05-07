using Microsoft.AspNetCore.SignalR;

namespace AppointmentSchedulingApp.Presentation.Hubs
{
    public class CustomUserIdProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            return connection.GetHttpContext()?.Request.Query["userId"];
        }
    }

}
