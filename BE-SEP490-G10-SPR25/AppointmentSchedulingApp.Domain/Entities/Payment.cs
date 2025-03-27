using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int UserId { get; set; }

    public int ReservationId { get; set; }

    public DateTime? PaymentDate { get; set; }

    public int? ReceptionistId { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public string PaymentStatus { get; set; } = null!;

    public string? TransactionId { get; set; }

    public decimal Amount { get; set; }

    public virtual Receptionist? Receptionist { get; set; }

    public virtual Reservation Reservation { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
