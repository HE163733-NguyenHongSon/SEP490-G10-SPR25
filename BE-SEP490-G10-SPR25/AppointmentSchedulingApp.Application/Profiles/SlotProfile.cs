using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Domain.Entities;
using AutoMapper;

namespace AppointmentSchedulingApp.Application.Profiles
{
    public class SlotProfile : Profile
    {
        public SlotProfile()
        {
            CreateMap<Slot, SlotDTO>()
                .ForMember(dest => dest.SlotStartTime, opt => opt.MapFrom(src => src.SlotStartTime))
                .ForMember(dest => dest.SlotEndTime, opt => opt.MapFrom(src => src.SlotEndTime))
                .ReverseMap();
        }
    }
}
