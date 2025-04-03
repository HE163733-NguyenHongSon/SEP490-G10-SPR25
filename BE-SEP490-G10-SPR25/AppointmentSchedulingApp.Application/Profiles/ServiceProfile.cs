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
    public class ServiceProfile : Profile
    {
        public ServiceProfile()
        {
            CreateMap<Service, ServiceDTO>()
                .ForMember(dest => dest.ServiceName, opt => opt.MapFrom(src => src.ServiceName))
                .ForMember(dest => dest.Overview, opt => opt.MapFrom(src => src.Overview))
                .ForMember(dest => dest.Process, opt => opt.MapFrom(src => src.Process))
                .ForMember(dest => dest.TreatmentTechniques, opt => opt.MapFrom(src => src.TreatmentTechniques))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image))
                .ForMember(dest => dest.SpecialtyId, opt => opt.MapFrom(src => src.SpecialtyId))
                .ForMember(dest => dest.EstimatedTime, opt => opt.ConvertUsing<TimeOnlyToStringConverter, TimeOnly?>(src => src.EstimatedTime))
                .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.DoctorSchedules.
                 SelectMany(ds => ds.Reservations).Where(r => r.Feedback != null).Select(r => r.Feedback.ServiceFeedbackGrade ?? 0)
                      .DefaultIfEmpty(0) 
                      .Average()))
                .ForMember(dest => dest.RatingCount, opt => opt.MapFrom(src => src.DoctorSchedules.
                SelectMany(ds => ds.Reservations).Where(r => r.Feedback != null).Select(r => r.Feedback.ServiceFeedbackGrade).Count()));

            CreateMap<ServiceDTO, Service>()
                .ForMember(dest => dest.ServiceName, opt => opt.MapFrom(src => src.ServiceName))
                .ForMember(dest => dest.Overview, opt => opt.MapFrom(src => src.Overview))
                .ForMember(dest => dest.Process, opt => opt.MapFrom(src => src.Process))
                .ForMember(dest => dest.TreatmentTechniques, opt => opt.MapFrom(src => src.TreatmentTechniques))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image))
                .ForMember(dest => dest.SpecialtyId, opt => opt.MapFrom(src => src.SpecialtyId))
                .ForMember(dest => dest.EstimatedTime, opt => opt.ConvertUsing<StringToTimeOnlyConverter, string>(src => src.EstimatedTime));

            // Add mapping for ServiceDetailDTO
            CreateMap<Service, ServiceDetailDTO>()
                .IncludeBase<Service, ServiceDTO>()
                .ForMember(dest => dest.SpecialtyName, opt => opt.MapFrom(src => src.Specialty.SpecialtyName))
                .ForMember(dest => dest.IsPrepayment, opt => opt.MapFrom(src => src.IsPrepayment))
                .ForMember(dest => dest.RelatedDoctors, opt => opt.MapFrom(src => src.Doctors))
                .ForMember(dest => dest.RequiredDevices, opt => opt.Ignore()); // Will be set manually

            CreateMap<ServiceDetailDTO, Service>()
                .IncludeBase<ServiceDTO, Service>();
        }
    }
}
