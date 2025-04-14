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
    }
}
