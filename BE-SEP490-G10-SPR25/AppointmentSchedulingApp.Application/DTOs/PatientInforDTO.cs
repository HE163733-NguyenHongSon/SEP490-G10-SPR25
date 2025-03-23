using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class PatientInforDTO
    {
        public int UserId { get; set; }
        public int PatientId { get; set; }
        public long CitizenId { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public DateOnly Dob { get; set; }
        public string? Address { get; set; }
        public string? AvatarUrl { get; set; }
        public bool? IsVerify { get; set; }
    }
}
