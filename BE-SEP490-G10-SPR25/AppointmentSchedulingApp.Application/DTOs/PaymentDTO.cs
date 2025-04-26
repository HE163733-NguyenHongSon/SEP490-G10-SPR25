using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public  class PaymentDTO
    {
        [Key]
        public int? PaymentId { get; set; }
        public int PayerId { get; set; }
        public AddedReservationDTO Reservation { get; set; }
        public string? TransactionId { get; set; } = null!;
        public string? PaymentStatus { get; set; } = null!;
        public string PaymentMethod { get; set; } = null!;
        public decimal Amount { get; set; }

        public string? VnPayResponseCode { get; set; }

    }
}
