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
    public class RoomProfile : Profile
    {
        public RoomProfile()
        {
            CreateMap<Room, RoomDTO>()
                .ForMember(dest => dest.RoomName, opt => opt.MapFrom(src => src.RoomName))
                .ForMember(dest => dest.RoomType, opt => opt.MapFrom(src => src.RoomType))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ReverseMap();
        }
    }
}
