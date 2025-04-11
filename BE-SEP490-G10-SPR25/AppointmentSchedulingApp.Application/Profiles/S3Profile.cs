using System;
using AutoMapper;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Application.DTOs;

namespace AppointmentSchedulingApp.Application.Profiles
{
    public class S3Profile : Profile
    {
        public S3Profile()
        {
            CreateMap<S3, S3DTO>()
                .ForMember(dest => dest.Message, opt => opt.MapFrom(src => $"File {src.Name} uploaded successfully to {src.BucketName}"))
                .ForMember(dest => dest.FileName, opt => opt.MapFrom(src => src.Name))
                .AfterMap((src, dest) =>
                {
                    src.InputStream?.Dispose();
                });
        }
    }
}