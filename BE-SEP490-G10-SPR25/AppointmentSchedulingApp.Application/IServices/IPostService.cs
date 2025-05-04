using AppointmentSchedulingApp.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IPostService
    {
        Task<List<PostDTO>> GetAllPostsAsync();
        Task<List<PostDetailDTO>> GetAllPostDetailAsync();
        Task<PostDTO?> GetPostByIdAsync(int id);
        Task<PostDetailDTO> GetPostDetailAsync(int id);
        Task UpdatePostAsync(PostDetailDTO postDTO);
        Task AddPostAsync(PostDetailDTO postDetailDTO);
        Task <bool> DeletePostAsync(int id);
        Task<int> GetPostSectionsCountAsync();
        Task<string> FindFirstUnusedFileName(string extension);
    }
}
