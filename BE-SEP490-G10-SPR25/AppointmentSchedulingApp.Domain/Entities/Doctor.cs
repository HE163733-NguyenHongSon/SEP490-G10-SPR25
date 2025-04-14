using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class Doctor
{
    public int DoctorId { get; set; }

    public string? CurrentWork { get; set; }

    public string? DoctorDescription { get; set; }

    public string? Organization { get; set; }

    public string? Prize { get; set; }

    public string? ResearchProject { get; set; }

    public string? TrainingProcess { get; set; }

    public string? WorkExperience { get; set; }

    public string? AcademicTitle { get; set; }

    public string? Degree { get; set; }

    public double Rating { get; set; }

    public int RatingCount { get; set; }

    public virtual ICollection<Certification> Certifications { get; set; } = new List<Certification>();

    public virtual User DoctorNavigation { get; set; } = null!;

    public virtual ICollection<DoctorSchedule> DoctorSchedules { get; set; } = new List<DoctorSchedule>();

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

    public virtual ICollection<Service> Services { get; set; } = new List<Service>();

    public virtual ICollection<Specialty> Specialties { get; set; } = new List<Specialty>();
}
