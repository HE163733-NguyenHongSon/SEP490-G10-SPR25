using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class S3DTO
    {
        public int StatusCode { get; set; } = 200;
        public string Message { get; set; }
        public string? FileName { get; set; }

    }
}
