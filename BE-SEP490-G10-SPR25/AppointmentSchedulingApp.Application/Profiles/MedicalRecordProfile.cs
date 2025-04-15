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
    public class MedicalRecordProfile :Profile
    {
        public MedicalRecordProfile()    
        {
            CreateMap<MedicalRecord, MedicalRecordDTO>()
         .ForMember(dest => dest.ReservationId, opt => opt.MapFrom(src => src.ReservationId))         
         .ForMember(dest => dest.AppointmentDate, opt => opt.MapFrom(src => src.Reservation.AppointmentDate.ToString("dd/MM/yyyy  hh:mm:ss")))
         .ForMember(dest => dest.Symptoms, opt => opt.MapFrom(src => src.Symptoms))
         .ForMember(dest => dest.Diagnosis, opt => opt.MapFrom(src => src.Diagnosis))
         .ForMember(dest => dest.TreatmentPlan, opt => opt.MapFrom(src => src.TreatmentPlan))
         .ForMember(dest => dest.FollowUpDate, opt => opt.MapFrom(src => src.FollowUpDate))
         .ForMember(dest => dest.Notes, opt => opt.MapFrom(src => src.Notes))
          .ReverseMap();

            CreateMap<MedicalRecord, MedicalRecordDetailDTO>()
             .IncludeBase<MedicalRecord, MedicalRecordDTO>()
             .ForMember(dest => dest.Reservation, opt => opt.MapFrom(src => src.Reservation)).
              ReverseMap();
        }
    }
}
