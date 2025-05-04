using AppointmentSchedulingApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.IRepositories
{
    public interface ICommentRepository : IGenericRepository<Comment>
    {
        Task AddAsync(Comment comment);
        Task<List<Comment>> GetCommentsByPostIdAsync(int postId);
        Task DeleteAsync(int commentId);
        Task<Comment?> GetByIdAsync(int commentId);
    }
}
