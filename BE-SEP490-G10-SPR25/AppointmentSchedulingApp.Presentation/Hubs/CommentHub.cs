using Microsoft.AspNetCore.SignalR;

namespace AppointmentSchedulingApp.Presentation.Hubs
{
    public class CommentHub : Hub
    {
        public async Task SendComment(object message)
        {
            // ✅ In ra console trước khi gửi
            Console.WriteLine($"[Hub] Received comment: {message}");

            // ✅ Gửi lại message tới tất cả client
            await Clients.All.SendAsync("ReceiveComment", message);
        }
        public async Task DeleteComment(int commentId)
        {
            Console.WriteLine($"[Hub] Delete commentId: {commentId}");
            await Clients.All.SendAsync("DeleteComment", commentId);
        }
    }
}