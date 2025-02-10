using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.DTOs
{
    public class DoctorDTO

    {
        [Key]
        public string DoctorId { get; set; }

        public string? AcademicTitle { get; set; }

        public string Degree { get; set; }

        public string DoctorName { get; set; }

        public string? CurrentWork { get; set; }

        public string DoctorDescription { get; set; }

        public string SpecialtyNames {  get; set; }

        public string NumberOfService { get; set; }

        public double? Rating { get; set; }

        public string NumberOfExamination {  get; set; }
    }
}
