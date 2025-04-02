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
                .ForMember(dest => dest.PostSections, opt => opt.MapFrom(src => new List<PostSection>
                {
                    new PostSection
                    {
                        PostImageUrl = src.PostImageUrl,
                        SectionTitle = src.PostCategory,
                        SectionContent = "Nội dung mặc định"
                    }
                }));
        }
    }
}
