using System;
using System.Collections.Generic;
using AppointmentSchedulingApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AppointmentSchedulingApp.Infrastructure.Database;

public partial class AppointmentSchedulingDbContext : DbContext
{
    public AppointmentSchedulingDbContext()
    {
    }

    public AppointmentSchedulingDbContext(DbContextOptions<AppointmentSchedulingDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Certification> Certifications { get; set; }

    public virtual DbSet<Device> Devices { get; set; }

    public virtual DbSet<Doctor> Doctors { get; set; }

    public virtual DbSet<DoctorSchedule> DoctorSchedules { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<MedicalRecord> MedicalRecords { get; set; }

    public virtual DbSet<Patient> Patients { get; set; }

    public virtual DbSet<Reservation> Reservations { get; set; }

    public virtual DbSet<Room> Rooms { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<Slot> Slots { get; set; }

    public virtual DbSet<Specialty> Specialties { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=AppointmentSchedulingDB; Trusted_Connection=SSPI;Encrypt=false;TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Categori__19093A0BFFF2A0D1");

            entity.Property(e => e.CategoryName)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Image).HasMaxLength(200);
        });

        modelBuilder.Entity<Certification>(entity =>
        {
            entity.HasKey(e => e.CertificationId).HasName("PK__Certific__1237E58A3720D143");

            entity.Property(e => e.CertificationUrl)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasDefaultValueSql("(NULL)");

            entity.HasOne(d => d.Doctor).WithMany(p => p.Certifications)
                .HasForeignKey(d => d.DoctorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Certification_FK");
        });

        modelBuilder.Entity<Device>(entity =>
        {
            entity.HasKey(e => e.DeviceId).HasName("PK__Devices__49E1231180B6D9C3");

            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.Functionality).HasColumnType("text");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Doctor>(entity =>
        {
            entity.HasKey(e => e.DoctorId).HasName("PK__Doctors__2DC00EBFB42CF4E4");

            entity.Property(e => e.DoctorId).ValueGeneratedNever();
            entity.Property(e => e.AcademicTitle)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CurrentWork).HasColumnType("text");
            entity.Property(e => e.Degree)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.DoctorDescription).HasColumnType("text");
            entity.Property(e => e.Organization).HasColumnType("text");
            entity.Property(e => e.Prize).HasColumnType("text");
            entity.Property(e => e.ResearchProject).HasColumnType("text");
            entity.Property(e => e.TrainingProcess).HasColumnType("text");
            entity.Property(e => e.WorkExperience).HasColumnType("text");

            entity.HasOne(d => d.DoctorNavigation).WithOne(p => p.Doctor)
                .HasForeignKey<Doctor>(d => d.DoctorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Doctor_FK");

            entity.HasMany(d => d.Services).WithMany(p => p.Doctors)
                .UsingEntity<Dictionary<string, object>>(
                    "DoctorService",
                    r => r.HasOne<Service>().WithMany()
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__DoctorSer__Servi__6C190EBB"),
                    l => l.HasOne<Doctor>().WithMany()
                        .HasForeignKey("DoctorId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__DoctorSer__Docto__6B24EA82"),
                    j =>
                    {
                        j.HasKey("DoctorId", "ServiceId").HasName("PK__DoctorSe__9191B5BFE26F8888");
                        j.ToTable("DoctorServices");
                    });

            entity.HasMany(d => d.Specialties).WithMany(p => p.Doctors)
                .UsingEntity<Dictionary<string, object>>(
                    "DoctorSpecialty",
                    r => r.HasOne<Specialty>().WithMany()
                        .HasForeignKey("SpecialtyId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__DoctorSpe__Speci__4CA06362"),
                    l => l.HasOne<Doctor>().WithMany()
                        .HasForeignKey("DoctorId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__DoctorSpe__Docto__4BAC3F29"),
                    j =>
                    {
                        j.HasKey("DoctorId", "SpecialtyId").HasName("PK__DoctorSp__B0B681D58FD60A70");
                        j.ToTable("DoctorSpecialties");
                    });
        });

        modelBuilder.Entity<DoctorSchedule>(entity =>
        {
            entity.HasKey(e => e.DoctorScheduleId).HasName("PK__DoctorSc__8B4DFC5C74A646E3");

            entity.Property(e => e.DayOfWeek)
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.HasOne(d => d.Doctor).WithMany(p => p.DoctorSchedules)
                .HasForeignKey(d => d.DoctorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("DoctorId_FK");

            entity.HasOne(d => d.Room).WithMany(p => p.DoctorSchedules)
                .HasForeignKey(d => d.RoomId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("RoomId_FK");

            entity.HasOne(d => d.Service).WithMany(p => p.DoctorSchedules)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ServiceId_FK");

            entity.HasOne(d => d.Slot).WithMany(p => p.DoctorSchedules)
                .HasForeignKey(d => d.SlotId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("SlotId_FK");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__Feedback__6A4BEDD6B9B76644");

            entity.Property(e => e.DoctorFeedbackContent).HasColumnType("text");
            entity.Property(e => e.FeedbackDate).HasColumnType("datetime");
            entity.Property(e => e.ServiceFeedbackContent).HasColumnType("text");

            entity.HasOne(d => d.Reservation).WithOne(p => p.Feedback)
                .HasForeignKey<Feedback>(d => d.ReservationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ReservationId_FK");
        });

        modelBuilder.Entity<MedicalRecord>(entity =>
        {
            entity.HasKey(e => e.MedicalRecordId).HasName("PK__MedicalR__4411BA220AFBCBE9");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Diagnosis).HasColumnType("text");
            entity.Property(e => e.FollowUpDate).HasColumnType("datetime");
            entity.Property(e => e.Notes).HasColumnType("text");
            entity.Property(e => e.Symptoms).HasColumnType("text");
            entity.Property(e => e.TreatmentPlan).HasColumnType("text");

            entity.HasOne(d => d.Reservation).WithMany(p => p.MedicalRecords)
                .HasForeignKey(d => d.ReservationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReservationId");
        });

        modelBuilder.Entity<Patient>(entity =>
        {
            entity.HasKey(e => e.PatientId).HasName("PK__Patients__970EC3666A4E94A9");

            entity.Property(e => e.PatientId).ValueGeneratedNever();
            entity.Property(e => e.Rank)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasDefaultValueSql("(NULL)");

            entity.HasOne(d => d.PatientNavigation).WithOne(p => p.Patient)
                .HasForeignKey<Patient>(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Patient_FK");
        });

        modelBuilder.Entity<Reservation>(entity =>
        {
            entity.HasKey(e => e.ReservationId).HasName("PK__Reservat__B7EE5F24B93F8BE2");

            entity.Property(e => e.AppointmentDate).HasColumnType("datetime");
            entity.Property(e => e.CancellationReason)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PriorExaminationImg)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Reason).HasColumnType("text");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.DoctorSchedule).WithMany(p => p.Reservations)
                .HasForeignKey(d => d.DoctorScheduleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("DoctorScheduleId_FK");

            entity.HasOne(d => d.Patient).WithMany(p => p.Reservations)
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("PatientId_FK");
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.HasKey(e => e.RoomId).HasName("PK__Rooms__328639393390FD2C");

            entity.Property(e => e.Location)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.RoomName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.RoomType)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.ServiceId).HasName("PK__Services__C51BB00AA5CD56C8");

            entity.Property(e => e.Image)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasDefaultValue("https://th.bing.com/th/id/OIP.ITpfvpcflBQwxt--PL_WegHaEc?w=252&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7");
            entity.Property(e => e.Overview).HasColumnType("text");
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Process).HasColumnType("text");
            entity.Property(e => e.ServiceName)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.TreatmentTechniques).HasColumnType("text");

            entity.HasOne(d => d.Category).WithMany(p => p.Services)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("CategoryId_FK");

            entity.HasOne(d => d.Specialty).WithMany(p => p.Services)
                .HasForeignKey(d => d.SpecialtyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("SpecialtyId_FK");

            entity.HasMany(d => d.Devices).WithMany(p => p.Services)
                .UsingEntity<Dictionary<string, object>>(
                    "DeviceService",
                    r => r.HasOne<Device>().WithMany()
                        .HasForeignKey("DeviceId")
                        .HasConstraintName("FK__DeviceSer__Devic__68487DD7"),
                    l => l.HasOne<Service>().WithMany()
                        .HasForeignKey("ServiceId")
                        .HasConstraintName("FK__DeviceSer__Servi__6754599E"),
                    j =>
                    {
                        j.HasKey("ServiceId", "DeviceId").HasName("PK__DeviceSe__C185A23B1C17D30A");
                        j.ToTable("DeviceServices");
                    });
        });

        modelBuilder.Entity<Slot>(entity =>
        {
            entity.HasKey(e => e.SlotId).HasName("PK__Slots__0A124AAF03E41AA4");

            entity.Property(e => e.SlotId).ValueGeneratedNever();
            entity.Property(e => e.SlotEndTime).HasDefaultValueSql("(NULL)");
            entity.Property(e => e.SlotStartTime).HasDefaultValueSql("(NULL)");
        });

        modelBuilder.Entity<Specialty>(entity =>
        {
            entity.HasKey(e => e.SpecialtyId).HasName("PK__Specialt__D768F6A828B9E8B3");

            entity.Property(e => e.Image)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasDefaultValue("https://th.bing.com/th/id/OIP.5kVbDAdvd-TbbhL31d-2sgHaE4?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7");
            entity.Property(e => e.SpecialtyDescription).HasColumnType("text");
            entity.Property(e => e.SpecialtyName)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasMany(d => d.Devices).WithMany(p => p.Specialties)
                .UsingEntity<Dictionary<string, object>>(
                    "DeviceSpecialty",
                    r => r.HasOne<Device>().WithMany()
                        .HasForeignKey("DeviceId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__DeviceSpe__Devic__45F365D3"),
                    l => l.HasOne<Specialty>().WithMany()
                        .HasForeignKey("SpecialtyId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__DeviceSpe__Speci__44FF419A"),
                    j =>
                    {
                        j.HasKey("SpecialtyId", "DeviceId").HasName("PK__DeviceSp__D3F6E499279A3B83");
                        j.ToTable("DeviceSpecialties");
                    });
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4CCC2C18AD");

            entity.HasIndex(e => e.CitizenId, "CitizenId_Unique").IsUnique();

            entity.HasIndex(e => e.Email, "Email_Unique").IsUnique();

            entity.HasIndex(e => e.Phone, "Phone_Unique").IsUnique();

            entity.Property(e => e.Address)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.AvatarUrl)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Gender)
                .HasMaxLength(6)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(300)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.Role)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
