using AppointmentSchedulingApp.Services.DTOs;
using AppointmentSchedulingApp.Domain.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Services.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, RegistrationDTO>()
        .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
        .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
        .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password))
        .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.Phone))
        .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender))
        .ForMember(dest => dest.Dob, opt => opt.MapFrom(src => src.Dob.ToString("dd/MM/yyyy")))
        .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
        .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))

        .ReverseMap();

            CreateMap<User, UserDTO>()
              .IncludeBase<User, RegistrationDTO>()
              .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId)).ReverseMap();



        }
    }
}
