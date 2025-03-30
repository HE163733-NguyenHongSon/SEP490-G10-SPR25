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
                .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating))
                .ForMember(dest => dest.RatingCount, opt => opt.MapFrom(src => src.RatingCount))
                .ForMember(dest => dest.IsPrepayment, opt => opt.MapFrom(src => src.IsPrepayment))
                .ForMember(dest => dest.EstimatedTime, opt => opt.MapFrom(src => 
                    src.EstimatedTime.HasValue ? src.EstimatedTime.Value.ToString() : null));

            CreateMap<ServiceDTO, Service>()
                .ForMember(dest => dest.ServiceName, opt => opt.MapFrom(src => src.ServiceName))
                .ForMember(dest => dest.Overview, opt => opt.MapFrom(src => src.Overview))
                .ForMember(dest => dest.Process, opt => opt.MapFrom(src => src.Process))
                .ForMember(dest => dest.TreatmentTechniques, opt => opt.MapFrom(src => src.TreatmentTechniques))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image))
                .ForMember(dest => dest.SpecialtyId, opt => opt.MapFrom(src => src.SpecialtyId))
                .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating))
                .ForMember(dest => dest.RatingCount, opt => opt.MapFrom(src => src.RatingCount))
                .ForMember(dest => dest.IsPrepayment, opt => opt.MapFrom(src => src.IsPrepayment))
                .ForMember(dest => dest.EstimatedTime, opt => opt.Ignore()); // Use AfterMap to handle conversion
                
            // Add mapping for ServiceDetailDTO
            CreateMap<Service, ServiceDetailDTO>()
                .ForMember(dest => dest.ServiceName, opt => opt.MapFrom(src => src.ServiceName))
                .ForMember(dest => dest.Overview, opt => opt.MapFrom(src => src.Overview))
                .ForMember(dest => dest.Process, opt => opt.MapFrom(src => src.Process))
                .ForMember(dest => dest.TreatmentTechniques, opt => opt.MapFrom(src => src.TreatmentTechniques))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image))
                .ForMember(dest => dest.SpecialtyId, opt => opt.MapFrom(src => src.SpecialtyId))
                .ForMember(dest => dest.IsPrepayment, opt => opt.MapFrom(src => src.IsPrepayment))
                .ForMember(dest => dest.EstimatedTime, opt => opt.MapFrom(src => 
                    src.EstimatedTime.HasValue ? src.EstimatedTime.Value.ToString() : null))
                .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating))
                .ForMember(dest => dest.RatingCount, opt => opt.MapFrom(src => src.RatingCount))
                .ForMember(dest => dest.SpecialtyName, opt => opt.Ignore()) // Will be set manually
                .ForMember(dest => dest.RelatedDoctors, opt => opt.Ignore()) // Will be set manually
                .ForMember(dest => dest.RequiredDevices, opt => opt.Ignore()); // Will be set manually
                
            // Handle TimeOnly conversion using AfterMap
            CreateMap<ServiceDTO, Service>().AfterMap((src, dest) => {
                if (!string.IsNullOrEmpty(src.EstimatedTime))
                {
                    try
                    {
                        dest.EstimatedTime = TimeOnly.Parse(src.EstimatedTime);
                    }
                    catch
                    {
                        dest.EstimatedTime = null;
                    }
                }
            });
        }
    }
}
