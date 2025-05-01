using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class Payment
{
    public int ReservationId { get; set; }

    public int PayerId { get; set; }


    public DateTime? PaymentDate { get; set; }= DateTime.Now;   

    public int? ReceptionistId { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public string PaymentStatus { get; set; } = null!;

    public string? TransactionId { get; set; }

    public decimal Amount { get; set; }

    public virtual User Payer { get; set; } = null!;

    public virtual Receptionist? Receptionist { get; set; }

    public virtual Reservation Reservation { get; set; } = null!;
}
