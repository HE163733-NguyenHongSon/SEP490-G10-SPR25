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
            //CreateMap<PostDetailDTO, Post>()
            //    .ForMember(dest => dest.PostId, opt => opt.Ignore())
            //    .ForMember(dest => dest.PostAuthor, opt => opt.Ignore())
            //    .ForMember(dest => dest.PostSections, opt => opt.MapFrom(src => new List<PostSection>
            //    {
            //        new PostSection
            //        {
            //            PostImageUrl = src.PostImageUrl,
            //            SectionTitle = src.PostCategory,
            //            SectionContent = "Nội dung mặc định"
            //        }
            //    }));
            //CreateMap<Post, PostDTO>();
            CreateMap<PostDetailDTO, Post>()
                .ForMember(dest => dest.PostId, opt => opt.Ignore())
                .ForMember(dest => dest.PostAuthor, opt => opt.Ignore())
                .ForMember(dest => dest.PostSections, opt => opt.MapFrom(src => src.PostSections));

            //CreateMap<Post, PostDTO>()
            //.ForMember(dest => dest.AuthorName,
            //    opt => opt.MapFrom(src =>
            //        src.PostAuthor != null && src.PostAuthor.User != null
            //            ? src.PostAuthor.DoctorNavigation.UserName
            //            : "Ẩn danh"))
            //.ForMember(dest => dest.PostImageUrl,
            //    opt => opt.MapFrom(src => src.PostImageUrl));

            //CreateMap<Post, PostDetailDTO>()
            //    .ForMember(dest => dest.AuthorBio,
            //                opt => opt.MapFrom(src => src.PostAuthor!.DoctorDescription))
            //    .ForMember(dest => dest.PostImageUrl,
            //        opt => opt.MapFrom(src => src.PostSections
            //            .OrderBy(s=>s.SectionIndex)
            //            .Select(s => s.PostImageUrl)
            //            .FirstOrDefault()));

            CreateMap<Post, PostDTO>()
            .ForMember(dest => dest.AuthorName,
                opt => opt.MapFrom(src => src.PostAuthor != null
                    ? src.PostAuthor.DoctorNavigation.UserName
                        : "Ẩn danh"))
            .ForMember(dest => dest.PostImageUrl,
                opt => opt.MapFrom(src => src.PostSections
                    .OrderBy(s => s.SectionIndex)
                    .Select(s => s.PostImageUrl)
                    .FirstOrDefault()));

            CreateMap<Post, PostDetailDTO>()
                .ForMember(dest => dest.AuthorName,
                    opt => opt.MapFrom(src => src.PostAuthor != null
                        ? src.PostAuthor.DoctorNavigation.UserName
                            : "Ẩn  danh"))
                .ForMember(dest => dest.PostImageUrl,
                    opt => opt.MapFrom(src => src.PostSections
                   .OrderBy(s => s.SectionIndex)
                .Select(s => s.PostImageUrl)
                .FirstOrDefault()));

            CreateMap<PostSection, PostSectionDTO>();
            CreateMap<PostSectionDTO, PostSection>();

            /// Map comment -> Post
            CreateMap<Comment, CommentDTO>();
            CreateMap<CommentDTO, Comment>();
        }
    }
}
