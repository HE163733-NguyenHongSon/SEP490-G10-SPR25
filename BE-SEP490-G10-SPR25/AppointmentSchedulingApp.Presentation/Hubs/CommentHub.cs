using Microsoft.AspNetCore.SignalR;

namespace AppointmentSchedulingApp.Presentation.Hubs
{
    public class CommentHub : Hub
    {
        public async Task SendComment(object message)
        {
            Console.WriteLine($"[Hub] Received comment: {message}");
            await Clients.All.SendAsync("ReceiveComment", message);
        }
        public async Task UpdateComment(object updatedComment)
        {
            Console.WriteLine($"[Hub] Update comment: {updatedComment}");
            await Clients.All.SendAsync("UpdateComment", updatedComment);
        }
        public async Task DeleteComment(int commentId)
        {
            Console.WriteLine($"[Hub] Delete commentId: {commentId}");
            await Clients.All.SendAsync("DeleteComment", commentId);
        }
    }
}