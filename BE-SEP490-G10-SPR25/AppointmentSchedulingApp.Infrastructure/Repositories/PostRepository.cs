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
    public class PostRepository : GenericRepository<Post>, IPostRepository
    {
        private readonly AppointmentSchedulingDbContext _context;

        public PostRepository(AppointmentSchedulingDbContext context) : base(context)
        {
            _context = context;
        }
        public async Task<List<Post>> GetAllPostsWithDetails()
        {
            return await _context.Posts
                .Include(p => p.PostSections)
                .ToListAsync();
        }
        public async Task<IQueryable<Post>> GetAllPosts()
        {
            return _context.Posts.AsQueryable();
        }
        public async Task<Post?> GetPostById(int id)
        {
            return await _context.Posts.FirstOrDefaultAsync(p => p.PostId == id);
        }
        public async Task<Post?> GetPostDetailById(int id)
        {
            return await _context.Posts
                .Include(p => p.PostSections)
                .Include(p => p.PostAuthor)
                .FirstOrDefaultAsync(p => p.PostId == id);
        }
    }
}
