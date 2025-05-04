using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Infrastructure.Repositories
{
    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        public CommentRepository (AppointmentSchedulingDbContext context) : base (context)
        {

        }
        public async Task AddAsync(Comment comment)
        {
            await base.AddAsync (comment);
        }
        public async Task<List<Comment>> GetCommentsByPostIdAsync(int postId)
        {
            return await _dbContext.Comments
                .Where(c => c.PostId == postId)
                .OrderBy(c => c.CommentOn)
                .ToListAsync();
        }
        public void Update(Comment comment)
        {
            _dbContext.Comments.Update(comment);
        }
        public async Task<Comment?> GetByIdAsync(int commentId)
        {
            return await _dbContext.Comments.FindAsync(commentId);
        }
        public async Task DeleteAsync(int commentId)
        {
            var comment = await _dbContext.Comments.FindAsync(commentId);
            if (comment != null)
            {
                _dbContext.Comments.Remove(comment);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
