using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class MedicalRecordDetailDTO:MedicalRecordDTO
    {
        [Key]
        [JsonPropertyOrder(8)]
        public ReservationDTO Reservation { get; set; }
        
        [JsonPropertyOrder(12)]
        public string PatientName { get; set; }
        
        [JsonPropertyOrder(13)]
        public int? PatientId { get; set; }
        
        [JsonPropertyOrder(14)]
        public string PatientGender { get; set; }
        
        [JsonPropertyOrder(15)]
        public string PatientDob { get; set; }
    }
}
