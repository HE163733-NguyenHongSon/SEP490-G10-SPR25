using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Infrastructure.Repositories;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Services
{
    public class PostService:IPostService
    {
        public IUnitOfWork unitOfWork { get; set; }
        private readonly IMapper _mapper;
        private readonly IPostRepository _postRepository;


        public PostService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            _mapper = mapper;
            _postRepository = unitOfWork.PostRepository;
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
                post.PostAuthorId = postDTO.AuthorId;
                post.PostSections = _mapper.Map<List<PostSection>>(postDTO.PostSections);
                post.PostCreatedDate = DateTime.Now;
                await _postRepository.AddAsync(post);
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi tạo bài viết: " + ex.Message, ex);
            }
            
        }
        public async Task UpdatePostAsync(PostDetailDTO postDTO)
        {
            var postEntity = await _postRepository.GetPostDetailById(postDTO.PostId);
            if (postEntity == null) throw new Exception("Không tìm thấy bài viết");
            _mapper.Map(postDTO, postEntity);
            var newSections = postDTO.PostSections;
            var existingSections = postEntity.PostSections.ToList();
            foreach(var oldSection in existingSections)
            {
                if (!newSections.Any(s => s.SectionIndex == oldSection.SectionIndex))
                {
                    _postRepository.DeletePostSection(oldSection);
                }   
            }
            foreach (var newSection in newSections)
            {
                var existing = existingSections.FirstOrDefault(s => s.SectionIndex == newSection.SectionIndex);
                if (existing != null)
                {
                    existing.SectionTitle = newSection.SectionTitle;
                    existing.SectionContent = newSection.SectionContent;
                    existing.PostImageUrl = newSection.PostImageUrl;
                }
                else
                {
                    var sectionEntity = _mapper.Map<PostSection>(newSection);
                    sectionEntity.PostId = postEntity.PostId;
                    await _postRepository.AddPostSectionAsync(sectionEntity);
                }
            }
            _postRepository.Update(postEntity);
            await unitOfWork.CommitAsync();
        }
        public async Task<bool> DeletePostAsync(int id)
        {
            var post = await _postRepository.GetPostById(id);
            if (post == null) return false;
            await _postRepository.DeletePostAsync(id);
            await unitOfWork.CommitAsync();
            return true;
        }
        public Task<int> GetPostSectionsCountAsync()
        {
            return _postRepository.GetPostSectionsCountAsync();
        }
        public async Task<string> FindFirstUnusedFileName(string extension)
        {
            var usedNames = await _postRepository.GetAllPostSectionImageNamesAsync(); // ví dụ ["phan_1.png", "phan_2.jpg"]
            var usedSet = new HashSet<string>(usedNames.Select(x => x.ToLower()));

            int index = 1;
            while (true)
            {
                string name = $"phan_{index}{extension}".ToLower();
                if (!usedSet.Contains(name))
                    return name;
                index++;
            }
        }


    }
}
