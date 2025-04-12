using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
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
        public IUnitOfWork unitOfWork { get; set; }
        private readonly IMapper _mapper;

        public PostService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<PostDTO>> GetAllPostsAsync()
        {
            var posts = await unitOfWork.PostRepository.GetAllPosts();
            return posts.Select(p => new PostDTO
            {
                PostId = p.PostId,
                PostTitle = p.PostTitle,
                PostDescription = p.PostDescription,
                PostSourceUrl = p.PostSourceUrl,
                PostCreatedDate = p.PostCreatedDate,
            }).ToList();
        }
        public async Task <PostDTO?> GetPostByIdAsync(int id)
        {
            var p = await unitOfWork.PostRepository.GetPostById(id);
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
        public async Task AddPostAsync(PostDetailDTO postDTO)
        {
            var post = _mapper.Map<Post>(postDTO);
            post.PostCreatedDate = DateTime.Now;
            await unitOfWork.PostRepository.AddAsync(post);
        }
    }
}
