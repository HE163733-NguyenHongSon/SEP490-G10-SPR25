using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public  class FeedbackDTO
    {
        [Key]
        public int FeedbackId { get; set; }

        public int ReservationId { get; set; }

        public int PatientId {  get; set; }
        public string PatientName {  get; set; }
        public string PatientImage{  get; set; }

        public int  ServiceId  {  get; set; }
        public string ServiceName  {  get; set; }

        public int ServiceFeedbackGrade { get; set; }
        public string ServiceFeedbackContent { get; set; } = null!;


        public int  DoctorId  {  get; set; }
        public string DoctorName  {  get; set; }

        public int DoctorFeedbackGrade { get; set; }
        public string DoctorFeedbackContent { get; set; } = null!;


        public DateTime  FeedbackDate { get; set; }
    }
}
