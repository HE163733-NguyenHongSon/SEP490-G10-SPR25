using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.DTOs
{
    public class SpecialtyDetailDTO:SpecialtyDTO
    {
        [JsonPropertyOrder(4)]
        public string? SpecialtyDescription { get; set; }
        //dto
    }
}
