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
    public class GuardianProfile : Profile
    {
        public GuardianProfile()
        {
            CreateMap<User, GuardianDTO>()
                .IncludeBase<User, UserDTO>()
                .ForMember(dest => dest.GuardianId, opt => opt.MapFrom(src => src.Guardian.GuardianId))
                .ForMember(dest => dest.Relationship, opt => opt.MapFrom(src => src.Guardian.Relationship))
                .ReverseMap();
        }
    }
}
