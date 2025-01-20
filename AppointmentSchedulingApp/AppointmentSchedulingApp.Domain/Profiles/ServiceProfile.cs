using AppointmentSchedulingApp.Domain.DTOs;
using AppointmentSchedulingApp.Domain.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.Profiles
{
    public class ServiceProfile:Profile
    {
        public ServiceProfile()
        {
            CreateMap<Service, ServiceDTO>()
            .ForMember(dest => dest.ServiceId, opt => opt.MapFrom(src => src.ServiceId))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.ServiceName))
            .ReverseMap();
        }
    }
}
