using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public int ReservationId { get; set; }

    public string ServiceFeedbackContent { get; set; } = null!;

    public int? ServiceFeedbackGrade { get; set; }

    public string DoctorFeedbackContent { get; set; } = null!;

    public int? DoctorFeedbackGrade { get; set; }

    public DateTime FeedbackDate { get; set; }

    public virtual Reservation Reservation { get; set; } = null!;
}
