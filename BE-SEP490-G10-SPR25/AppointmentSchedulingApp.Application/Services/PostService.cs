using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IRepositories;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Services
{
    public class PostService:IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;
        public PostService(IPostRepository postRepository, IMapper mapper)
        {
            _postRepository = postRepository;
            _mapper = mapper;
        }
        public async Task<List<PostDetailDTO>> GetAllPostDetailAsync()
        {
            var posts = await _postRepository.GetAllPostsWithDetails();
            return posts.Select(p => new PostDetailDTO
            {
                PostId = p.PostId,
                PostTitle = p.PostTitle,
                PostDescription = p.PostDescription,
                PostCategory = "",
                PostCreatedDate = p.PostCreatedDate,
                PostSourceUrl = p.PostSourceUrl,
                AuthorName = "",
                PostImageUrl = p.PostSections.OrderBy(s => s.SectionIndex).Select(s => s.PostImageUrl).FirstOrDefault(),
            }).ToList();
        }
        public async Task<List<PostDTO>> GetAllPostsAsync()
        {
            var posts = await _postRepository.GetAllPostsWithDetails();
            return _mapper.Map<List<PostDTO>>(posts);
            /*var posts = await _postRepository.GetAllPosts();
            return posts.Select(p => new PostDTO
            {
                PostId = p.PostId,
                PostTitle = p.PostTitle,
                PostDescription = p.PostDescription,
                PostSourceUrl = p.PostSourceUrl,
                PostCreatedDate = p.PostCreatedDate,
            }).ToList();*/
        }
        public async Task <PostDTO?> GetPostByIdAsync(int id)
        {
            var p = await _postRepository.GetPostById(id);
            if (p == null) return null;
            return new PostDTO
            {
                PostId = p.PostId,
                PostTitle = p.PostTitle,
                PostDescription = p.PostDescription,
                PostCreatedDate = p.PostCreatedDate,
                PostSourceUrl = p.PostSourceUrl,
            };
        }
        public async Task<PostDetailDTO> GetPostDetailAsync(int id)
        {
            var p = await _postRepository.GetPostById(id);
            if (p == null) return null;
            return _mapper.Map<PostDetailDTO>(p);
        }
        public async Task AddPostAsync(PostDetailDTO postDTO)
        {
            try
            {
                var post = _mapper.Map<Post>(postDTO);
                post.PostCreatedDate = DateTime.Now;
                await _postRepository.AddAsync(post);
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi tạo bài viết: " + ex.Message, ex);
            }
            
        }
    }
}
