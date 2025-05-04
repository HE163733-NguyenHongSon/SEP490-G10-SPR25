using AppointmentSchedulingApp.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface ICommentService
    {
        Task<List<CommentDTO>> GetCommentsByPostIdAsync(int postId);
        Task<CommentDTO> AddCommentAsync(CommentDTO commentDTO);
        Task<bool> DeleteCommentAsync(int commentId);
        Task<CommentDTO?> EditCommentAsync(int commentId, string newContent);
        //Task<bool> LikeCommentAsync(int commentId);
    }
}
