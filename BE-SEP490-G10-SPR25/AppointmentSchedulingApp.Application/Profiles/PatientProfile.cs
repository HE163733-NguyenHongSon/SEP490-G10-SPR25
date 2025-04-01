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
                .ForMember(dest => dest.CitizenId, opt => opt.MapFrom(src => src.UserNavigation.CitizenId))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.UserNavigation.Email))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserNavigation.UserName))
                .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.UserNavigation.Phone))
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.UserNavigation.Gender))
                .ForMember(dest => dest.Dob, opt => opt.MapFrom(src => src.UserNavigation.Dob))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.UserNavigation.Address))
                .ForMember(dest => dest.AvatarUrl, opt => opt.MapFrom(src => src.UserNavigation.AvatarUrl))
                .ReverseMap();

        }
    }
}
