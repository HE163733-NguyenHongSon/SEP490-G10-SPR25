using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Domain.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Routing.Constraints;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Profiles
{
    public class PostProfile : Profile
    {
        public PostProfile()
        {

            CreateMap<PostDetailDTO, Post>()
                .ForMember(dest => dest.PostId, opt => opt.Ignore())
                .ForMember(dest => dest.PostAuthor, opt => opt.Ignore())
                .ForMember(dest => dest.PostSections, opt => opt.Ignore())
                .ForMember(dest => dest.Comments, opt => opt.Ignore())
                .ForMember(dest => dest.PostCreatedDate, opt => opt.Ignore());

            CreateMap<Post, PostDTO>()
            .ForMember(dest => dest.AuthorName,
                opt => opt.MapFrom(src => src.PostAuthor != null
                    ? src.PostAuthor.DoctorNavigation.UserName
                        : "Ẩn danh"))
            .ForMember(dest => dest.PostImageUrl,
                opt => opt.MapFrom(src => src.PostSections
                    .OrderBy(s => s.SectionIndex)
                    .Select(s => s.PostImageUrl)
                    .FirstOrDefault()))
            .ForMember(dest => dest.AuthorId,
                opt => opt.MapFrom(src => src.PostAuthorId));

            CreateMap<Post, PostDetailDTO>()
                .ForMember(dest => dest.AuthorName,
                    opt => opt.MapFrom(src => src.PostAuthor != null
                        ? src.PostAuthor.DoctorNavigation.UserName
                            : "Ẩn  danh"))
                .ForMember(dest => dest.PostImageUrl,
                    opt => opt.MapFrom(src => src.PostSections
                   .OrderBy(s => s.SectionIndex)
                .Select(s => s.PostImageUrl)
                .FirstOrDefault()))
                .ForMember(dest => dest.AuthorId,
                    opt => opt.MapFrom(src => src.PostAuthorId));

            CreateMap<PostSection, PostSectionDTO>();
            CreateMap<PostSectionDTO, PostSection>();

            /// Map comment -> Post
            CreateMap<Comment, CommentDTO>();
            CreateMap<CommentDTO, Comment>();
        }
    }
}
