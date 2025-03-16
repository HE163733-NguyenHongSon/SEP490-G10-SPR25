using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Infrastructure.Helper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;

namespace AppointmentSchedulingApp.Infrastructure.Database;

public partial class AppointmentSchedulingDbContext
    : IdentityDbContext<User, Role, int,
                        IdentityUserClaim<int>,
                        UserRole,
                        IdentityUserLogin<int>,
                        IdentityRoleClaim<int>,
                        IdentityUserToken<int>>

{
    public AppointmentSchedulingDbContext()
    {
    }

    public AppointmentSchedulingDbContext(DbContextOptions<AppointmentSchedulingDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Certification> Certifications { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Device> Devices { get; set; }

    public virtual DbSet<Doctor> Doctors { get; set; }

    public virtual DbSet<DoctorSchedule> DoctorSchedules { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<MedicalRecord> MedicalRecords { get; set; }

    public virtual DbSet<Patient> Patients { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<PostSection> PostSections { get; set; }

    public virtual DbSet<Receptionist> Receptionists { get; set; }

    public virtual DbSet<Reservation> Reservations { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

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
        modelBuilder.Entity<UserRole>(entity =>
        {
            //entity.HasKey(ur => new { ur.UserId, ur.RoleId });
            modelBuilder.Entity<UserRole>()
          .HasKey(ur => new { ur.UserId, ur.RoleId }); // Định nghĩa khóa chính tổng hợp
            // Cấu hình quan hệ giữa ApplicationUserRole và ApplicationUser
            entity.HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            // Cấu hình quan hệ giữa ApplicationUserRole và ApplicationRole
            entity.HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
        });
        modelBuilder.Entity<Certification>(entity =>
        {
            entity.HasKey(e => e.CertificationId).HasName("PK__Certific__1237E58A80003FAC");

            entity.Property(e => e.CertificationUrl)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasDefaultValueSql("(NULL)");

            entity.HasOne(d => d.Doctor).WithMany(p => p.Certifications)
                .HasForeignKey(d => d.DoctorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Certification_FK");
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.CommentId).HasName("PK__Comments__C3B4DFCAA6E322B2");

            entity.HasOne(d => d.Post).WithMany(p => p.Comments)
                .HasForeignKey(d => d.PostId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Comments_Post");

            entity.HasOne(d => d.User).WithMany(p => p.Comments)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Comments_User");
        });

        modelBuilder.Entity<Device>(entity =>
        {
            entity.HasKey(e => e.DeviceId).HasName("PK__Devices__49E12311CA0D38A2");

            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<Doctor>(entity =>
        {
            entity.HasKey(e => e.DoctorId).HasName("PK__Doctors__2DC00EBFAFB5BA47");

            entity.Property(e => e.DoctorId).ValueGeneratedNever();
            entity.Property(e => e.AcademicTitle).HasMaxLength(50);
            entity.Property(e => e.Degree).HasMaxLength(50);

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
                        .HasConstraintName("FK__DoctorSer__Servi__787EE5A0"),
                    l => l.HasOne<Doctor>().WithMany()
                        .HasForeignKey("DoctorId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__DoctorSer__Docto__778AC167"),
                    j =>
                    {
                        j.HasKey("DoctorId", "ServiceId").HasName("PK__DoctorSe__9191B5BF27529F64");
                        j.ToTable("DoctorServices");
                    });

            entity.HasMany(d => d.Specialties).WithMany(p => p.Doctors)
                .UsingEntity<Dictionary<string, object>>(
                    "DoctorSpecialty",
                    r => r.HasOne<Specialty>().WithMany()
                        .HasForeignKey("SpecialtyId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__DoctorSpe__Speci__5535A963"),
                    l => l.HasOne<Doctor>().WithMany()
                        .HasForeignKey("DoctorId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__DoctorSpe__Docto__5441852A"),
                    j =>
                    {
                        j.HasKey("DoctorId", "SpecialtyId").HasName("PK__DoctorSp__B0B681D5876997B1");
                        j.ToTable("DoctorSpecialties");
                    });
        });

        modelBuilder.Entity<DoctorSchedule>(entity =>
        {
            entity.HasKey(e => e.DoctorScheduleId).HasName("PK__DoctorSc__8B4DFC5C61E6F931");

            entity.Property(e => e.DayOfWeek).HasMaxLength(10);

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

            entity.HasMany(d => d.Reservations).WithMany(p => p.DoctorSchedules)
                .UsingEntity<Dictionary<string, object>>(
                    "ReservationDoctorSchedule",
                    r => r.HasOne<Reservation>().WithMany()
                        .HasForeignKey("ReservationId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_Reservation"),
                    l => l.HasOne<DoctorSchedule>().WithMany()
                        .HasForeignKey("DoctorScheduleId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_DoctorSchedule"),
                    j =>
                    {
                        j.HasKey("DoctorScheduleId", "ReservationId").HasName("PK__Reservat__D03319AE3263198D");
                        j.ToTable("ReservationDoctorSchedules");
                    });
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__Feedback__6A4BEDD68FA0D73F");

            entity.HasIndex(e => e.ReservationId, "UQ__Feedback__B7EE5F2576E44458").IsUnique();

            entity.Property(e => e.FeedbackDate).HasColumnType("datetime");

            entity.HasOne(d => d.Reservation).WithOne(p => p.Feedback)
                .HasForeignKey<Feedback>(d => d.ReservationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ReservationId_FK");
        });

        modelBuilder.Entity<MedicalRecord>(entity =>
        {
            entity.HasKey(e => e.MedicalRecordId).HasName("PK__MedicalR__4411BA2280374231");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.FollowUpDate).HasColumnType("datetime");

            entity.HasOne(d => d.Reservation).WithMany(p => p.MedicalRecords)
                .HasForeignKey(d => d.ReservationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReservationId");
        });

        modelBuilder.Entity<Patient>(entity =>
        {
            entity.HasKey(e => e.PatientId).HasName("PK__Patients__970EC3660F695A77");

            entity.Property(e => e.PatientId).ValueGeneratedNever();
            entity.Property(e => e.Rank)
                .HasMaxLength(10)
                .HasDefaultValueSql("(NULL)");

            entity.HasOne(d => d.Guardian).WithMany(p => p.PatientGuardians)
                .HasForeignKey(d => d.GuardianId)
                .HasConstraintName("Guardian_FK");

            entity.HasOne(d => d.PatientNavigation).WithOne(p => p.PatientPatientNavigation)
                .HasForeignKey<Patient>(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Patient_FK");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__Payments__9B556A380941252E");

            entity.Property(e => e.Amount).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.PaymentDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.PaymentMethod).HasMaxLength(50);
            entity.Property(e => e.PaymentStatus).HasMaxLength(50);
            entity.Property(e => e.ReceptionistId).HasDefaultValueSql("(NULL)");
            entity.Property(e => e.TransactionId)
                .HasMaxLength(100)
                .HasDefaultValueSql("(NULL)");

            entity.HasOne(d => d.Receptionist).WithMany(p => p.Payments)
                .HasForeignKey(d => d.ReceptionistId)
                .HasConstraintName("FK_Payments_Receptionist");

            entity.HasOne(d => d.Reservation).WithMany(p => p.Payments)
                .HasForeignKey(d => d.ReservationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Payments_Reservation");

            entity.HasOne(d => d.User).WithMany(p => p.Payments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Payments_User");
        });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.PostId).HasName("PK__Posts__AA1260181D859ECC");

            entity.Property(e => e.PostAuthorId).HasDefaultValueSql("(NULL)");
            entity.Property(e => e.PostCreatedDate).HasColumnType("datetime");
            entity.Property(e => e.PostSourceUrl)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasDefaultValueSql("(NULL)");
            entity.Property(e => e.PostTitle).HasMaxLength(200);

            entity.HasOne(d => d.PostAuthor).WithMany(p => p.Posts)
                .HasForeignKey(d => d.PostAuthorId)
                .HasConstraintName("Post_FK");
        });

        modelBuilder.Entity<PostSection>(entity =>
        {
            entity.HasKey(e => e.SectionId).HasName("PK__PostSect__80EF0872D37C2B56");

            entity.Property(e => e.PostImageUrl)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasDefaultValueSql("(NULL)");
            entity.Property(e => e.SectionTitle).HasMaxLength(200);

            entity.HasOne(d => d.Post).WithMany(p => p.PostSections)
                .HasForeignKey(d => d.PostId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Section_FK1");
        });

        modelBuilder.Entity<Receptionist>(entity =>
        {
            entity.HasKey(e => e.ReceptionistId).HasName("PK__Receptio__0F8C20A8B2BDF798");

            entity.Property(e => e.ReceptionistId).ValueGeneratedNever();
            entity.Property(e => e.Shift)
                .HasMaxLength(20)
                .HasDefaultValue("Ca sáng");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("Đang làm việc");

            entity.HasOne(d => d.ReceptionistNavigation).WithOne(p => p.Receptionist)
                .HasForeignKey<Receptionist>(d => d.ReceptionistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Receptionists_User");
        });

        modelBuilder.Entity<Reservation>(entity =>
        {
            entity.HasKey(e => e.ReservationId).HasName("PK__Reservat__B7EE5F249C0A4C24");

            entity.Property(e => e.AppointmentDate).HasColumnType("datetime");
            entity.Property(e => e.CancellationReason).HasMaxLength(255);
            entity.Property(e => e.PriorExaminationImg).HasMaxLength(200);
            entity.Property(e => e.Status).HasMaxLength(20);
            entity.Property(e => e.UpdatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Patient).WithMany(p => p.Reservations)
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("PatientId_FK");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Roles__8AFACE1AAEA5EBEC");

            entity.HasIndex(e => e.RoleName, "RoleName_Unique").IsUnique();

            entity.Property(e => e.RoleName).HasMaxLength(50);
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.HasKey(e => e.RoomId).HasName("PK__Rooms__32863939270C0522");

            entity.Property(e => e.Location).HasMaxLength(255);
            entity.Property(e => e.RoomName).HasMaxLength(100);
            entity.Property(e => e.RoomType).HasMaxLength(50);
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.ServiceId).HasName("PK__Services__C51BB00AD6C7F0C2");

            entity.Property(e => e.IsPrepayment).HasDefaultValue(false);
            entity.Property(e => e.Overview).HasMaxLength(500);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ServiceName).HasMaxLength(100);

            entity.HasOne(d => d.ParentService).WithMany(p => p.InverseParentService)
                .HasForeignKey(d => d.ParentServiceId)
                .HasConstraintName("FK__Services__Parent__628FA481");

            entity.HasOne(d => d.Specialty).WithMany(p => p.Services)
                .HasForeignKey(d => d.SpecialtyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Services__Specia__6383C8BA");

            entity.HasMany(d => d.Devices).WithMany(p => p.Services)
                .UsingEntity<Dictionary<string, object>>(
                    "DeviceService",
                    r => r.HasOne<Device>().WithMany()
                        .HasForeignKey("DeviceId")
                        .HasConstraintName("FK__DeviceSer__Devic__74AE54BC"),
                    l => l.HasOne<Service>().WithMany()
                        .HasForeignKey("ServiceId")
                        .HasConstraintName("FK__DeviceSer__Servi__73BA3083"),
                    j =>
                    {
                        j.HasKey("ServiceId", "DeviceId").HasName("PK__DeviceSe__C185A23BEA8646A2");
                        j.ToTable("DeviceServices");
                    });
        });

        modelBuilder.Entity<Slot>(entity =>
        {
            entity.HasKey(e => e.SlotId).HasName("PK__Slots__0A124AAF8BB79851");

            entity.Property(e => e.SlotId).ValueGeneratedNever();
            entity.Property(e => e.SlotEndTime).HasDefaultValueSql("(NULL)");
            entity.Property(e => e.SlotStartTime).HasDefaultValueSql("(NULL)");
        });

        modelBuilder.Entity<Specialty>(entity =>
        {
            entity.HasKey(e => e.SpecialtyId).HasName("PK__Specialt__D768F6A84CECEB03");

            entity.Property(e => e.Image)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasDefaultValue("https://th.bing.com/th/id/OIP.5kVbDAdvd-TbbhL31d-2sgHaE4?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7");
            entity.Property(e => e.SpecialtyName).HasMaxLength(100);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C3AD105FF");

            entity.HasIndex(e => e.Phone, "Phone_Unique").IsUnique();

            entity.Property(e => e.Address).HasMaxLength(100);
            entity.Property(e => e.AvatarUrl).HasMaxLength(200);
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Gender).HasMaxLength(6);
            entity.Property(e => e.IsVerify).HasDefaultValue(false);
            entity.Property(e => e.Password)
                .HasMaxLength(300)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.UserName).HasMaxLength(50);

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserRole",
                    r => r.HasOne<Role>().WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Role_FK"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("User_FK"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId").HasName("PK__UserRole__AF2760AD95813875");
                        j.ToTable("UserRoles");
                    });
        });
        DeleteIdentityPrefix(modelBuilder);
        RoleSeedData(modelBuilder);
        OnModelCreatingPartial(modelBuilder);
    }

    public void RoleSeedData(ModelBuilder modelBuilder)
    {
        // Seed roles
        //modelBuilder.Entity<Role>().HasData(
        //    new Role { Id = 1, Name = AppRole.Patient, NormalizedName = AppRole.Patient.ToUpper(), ConcurrencyStamp = "acccef8b-20f3-4de0-8ee9-5a3690f094ed" },
        //    new Role { Id = 2, Name = AppRole.Doctor, NormalizedName = AppRole.Doctor.ToUpper(), ConcurrencyStamp = "1a777fbf-24db-4247-bd76-db376d703ea9" }
        //);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    public void DeleteIdentityPrefix(ModelBuilder modelBuilder)
    {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var tableName = entityType.GetTableName();
            if (tableName.StartsWith("AspNet"))
            {
                entityType.SetTableName(tableName.Substring(6));
            }
        }
    }
}
