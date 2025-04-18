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
    public class SpecialtyProfile  :Profile
    {
        public SpecialtyProfile()
        {
            CreateMap<Specialty,SpecialtyDTO>()
            .ForMember(dest => dest.SpecialtyId, opt => opt.MapFrom(src => src.SpecialtyId))
            .ForMember(dest => dest.SpecialtyName, opt => opt.MapFrom(src => src.SpecialtyName))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.SpecialtyDescription))
            .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image)).ReverseMap();
            CreateMap<Specialty, SpecialtyDetailDTO>()
            .ForMember(dest => dest.SpecialtyDescription, opt => opt.MapFrom(src => src.SpecialtyDescription)).ReverseMap();
        }
    }
}
