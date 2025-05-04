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
                .Include(p => p.PostAuthor)
                    .ThenInclude(d => d.DoctorNavigation)
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
            .Include(p => p.Comments) 
            .Include(p => p.PostAuthor)
                .ThenInclude(d => d.DoctorNavigation)
            .FirstOrDefaultAsync(p => p.PostId == id);
        }
        public async Task DeletePostAsync(int id)
        {
            var post = await _context.Posts
                .Include(p => p.PostSections)
                .Include(p => p.Comments)
                .FirstOrDefaultAsync(p => p.PostId == id);
            if (post != null)
            {
                _context.PostSections.RemoveRange(post.PostSections);
                _context.Comments.RemoveRange(post.Comments);
                _context.Posts.Remove(post);
                await _context.SaveChangesAsync();
            }
        }
        public void DeletePostSection(PostSection section)
        {
            _context.PostSections.Remove(section);
        }
        public async Task AddPostSectionAsync(PostSection section)
        {
            await _context.PostSections.AddAsync(section);
        }
        public async Task<int> GetPostSectionsCountAsync()
        {
            return await _context.PostSections.CountAsync();
        }
        public async Task<List<string>> GetAllPostSectionImageNamesAsync()
        {
            return await _context.PostSections
                .Where(s => s.PostImageUrl != null && s.PostImageUrl.StartsWith("phan_"))
                .Select(s => s.PostImageUrl)
                .ToListAsync();
        }
    }
}
