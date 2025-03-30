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
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDTO>()
        .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
        .ForMember(dest => dest.CitizenId, opt => opt.MapFrom(src => src.CitizenId))
        .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
        .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password))
        .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.Phone))
        .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender))

         .ForMember(dest => dest.Dob, opt => opt.MapFrom(src => src.Dob.HasValue
            ? src.Dob.Value.ToDateTime(TimeOnly.MinValue).ToString("dd/MM/yyyy")
            : null))

        .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address)) 
        .ReverseMap();
        }
    }
}
