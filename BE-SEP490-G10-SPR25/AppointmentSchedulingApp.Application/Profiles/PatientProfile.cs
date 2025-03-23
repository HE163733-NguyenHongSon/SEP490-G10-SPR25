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
                .ForMember(dest => dest.CitizenId, opt => opt.MapFrom(src => src.PatientNavigation.CitizenId))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.PatientNavigation.Email))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.PatientNavigation.UserName))
                .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.PatientNavigation.Phone))
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.PatientNavigation.Gender))
                .ForMember(dest => dest.Dob, opt => opt.MapFrom(src => src.PatientNavigation.Dob))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.PatientNavigation.Address))
                .ForMember(dest => dest.AvatarUrl, opt => opt.MapFrom(src => src.PatientNavigation.AvatarUrl))
                .ReverseMap();
        }
    }
}
