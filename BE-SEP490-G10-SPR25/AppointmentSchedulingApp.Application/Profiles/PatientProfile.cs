using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Domain.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Profiles
{
    public class PatientProfile : Profile
    {
        public PatientProfile()
        {
            CreateMap<Patient, PatientDTO>()
                .ForMember(dest => dest.PatientId, opt => opt.MapFrom(src => src.PatientId))
                .ForMember(dest => dest.PatientName, opt => opt.MapFrom(src => src.UserNavigation.UserName))
                .ForMember(dest => dest.MainCondition, opt => opt.MapFrom(src => src.MainCondition))
                .ForMember(dest => dest.Rank, opt => opt.MapFrom(src => src.Rank))
                .ReverseMap();

            CreateMap<Patient, PatientDetailDTO>()
                .IncludeBase<Patient, PatientDTO>()
                .ForMember(dest => dest.CitizenId, opt => opt.MapFrom(src => src.UserNavigation.CitizenId))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.UserNavigation.Email))
                .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.UserNavigation.Phone))
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.UserNavigation.Gender))
                //.ForMember(dest => dest.Dob, opt => opt.MapFrom(src => src.UserNavigation.Dob))
                .ForMember(dest => dest.Dob, opt => opt.MapFrom(src => src.UserNavigation.Dob.HasValue
                    ? src.UserNavigation.Dob.Value.ToString("yyyy-MM-dd")
                    : null))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.UserNavigation.Address))
                .ForMember(dest => dest.AvatarUrl, opt => opt.MapFrom(src => src.UserNavigation.AvatarUrl))
                .ForMember(dest => dest.GuardianId, opt => opt.MapFrom(src => src.GuardianId))
                .ForMember(dest => dest.GuardianName, opt => opt.MapFrom(src => src.Guardian.UserName))
                .ForMember(dest => dest.GuardianPhone, opt => opt.MapFrom(src => src.Guardian.Phone))
                .ForMember(dest => dest.GuardianEmail, opt => opt.MapFrom(src => src.Guardian.Email))
                .ReverseMap();

        }
    }
}
