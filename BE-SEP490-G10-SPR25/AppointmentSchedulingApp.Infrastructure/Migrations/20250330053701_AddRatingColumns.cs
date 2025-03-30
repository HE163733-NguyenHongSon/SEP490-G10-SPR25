using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AppointmentSchedulingApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddRatingColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__DeviceSer__Devic__68487DD7",
                table: "DeviceServices");

            migrationBuilder.DropForeignKey(
                name: "FK__DeviceSer__Servi__6754599E",
                table: "DeviceServices");

            migrationBuilder.DropForeignKey(
                name: "Doctor_FK",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK__DoctorSer__Docto__6B24EA82",
                table: "DoctorServices");

            migrationBuilder.DropForeignKey(
                name: "FK__DoctorSer__Servi__6C190EBB",
                table: "DoctorServices");

            migrationBuilder.DropForeignKey(
                name: "FK__DoctorSpe__Docto__4BAC3F29",
                table: "DoctorSpecialties");

            migrationBuilder.DropForeignKey(
                name: "FK__DoctorSpe__Speci__4CA06362",
                table: "DoctorSpecialties");

            migrationBuilder.DropForeignKey(
                name: "Patient_FK",
                table: "Patients");

            migrationBuilder.DropForeignKey(
                name: "DoctorScheduleId_FK",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_RoleClaims_Roles_RoleId",
                table: "RoleClaims");

            migrationBuilder.DropForeignKey(
                name: "CategoryId_FK",
                table: "Services");

            migrationBuilder.DropForeignKey(
                name: "SpecialtyId_FK",
                table: "Services");

            migrationBuilder.DropForeignKey(
                name: "FK_UserClaims_Users_UserId",
                table: "UserClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_UserLogins_Users_UserId",
                table: "UserLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Roles_RoleId",
                table: "UserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Users_UserId",
                table: "UserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTokens_Users_UserId",
                table: "UserTokens");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "DeviceSpecialties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "CitizenId_Unique",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "Email_Unique",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "Phone_Unique",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Specialt__D768F6A828B9E8B3",
                table: "Specialties");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Slots__0A124AAF03E41AA4",
                table: "Slots");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Services__C51BB00AA5CD56C8",
                table: "Services");

            migrationBuilder.DropIndex(
                name: "IX_Services_CategoryId",
                table: "Services");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Rooms__328639393390FD2C",
                table: "Rooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Roles",
                table: "Roles");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Reservat__B7EE5F24B93F8BE2",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_DoctorScheduleId",
                table: "Reservations");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Patients__970EC3666A4E94A9",
                table: "Patients");

            migrationBuilder.DropPrimaryKey(
                name: "PK__MedicalR__4411BA220AFBCBE9",
                table: "MedicalRecords");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Feedback__6A4BEDD6B9B76644",
                table: "Feedbacks");

            migrationBuilder.DropPrimaryKey(
                name: "PK__DoctorSp__B0B681D58FD60A70",
                table: "DoctorSpecialties");

            migrationBuilder.DropPrimaryKey(
                name: "PK__DoctorSe__9191B5BFE26F8888",
                table: "DoctorServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK__DoctorSc__8B4DFC5C74A646E3",
                table: "DoctorSchedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Doctors__2DC00EBFB42CF4E4",
                table: "Doctors");

            migrationBuilder.DropPrimaryKey(
                name: "PK__DeviceSe__C185A23B1C17D30A",
                table: "DeviceServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Devices__49E1231180B6D9C3",
                table: "Devices");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Certific__1237E58A3720D143",
                table: "Certifications");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "DoctorScheduleId",
                table: "Reservations");

            migrationBuilder.RenameIndex(
                name: "IX_Feedbacks_ReservationId",
                table: "Feedbacks",
                newName: "UQ__Feedback__B7EE5F2576E44458");

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "Users",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsVerify",
                table: "Users",
                type: "bit",
                nullable: true,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<string>(
                name: "Gender",
                table: "Users",
                type: "nvarchar(6)",
                maxLength: 6,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(6)",
                oldUnicode: false,
                oldMaxLength: 6);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "varchar(50)",
                unicode: false,
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldUnicode: false,
                oldMaxLength: 30,
                oldNullable: true);

            migrationBuilder.AlterColumn<DateOnly>(
                name: "Dob",
                table: "Users",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<long>(
                name: "CitizenId",
                table: "Users",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<string>(
                name: "AvatarUrl",
                table: "Users",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldUnicode: false,
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Users",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldUnicode: false,
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Users",
                type: "varchar(300)",
                unicode: false,
                maxLength: 300,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Users",
                type: "varchar(12)",
                unicode: false,
                maxLength: 12,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "SpecialtyName",
                table: "Specialties",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldUnicode: false,
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "SpecialtyDescription",
                table: "Specialties",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "TreatmentTechniques",
                table: "Services",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ServiceName",
                table: "Services",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldUnicode: false,
                oldMaxLength: 30);

            migrationBuilder.AlterColumn<string>(
                name: "Process",
                table: "Services",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Overview",
                table: "Services",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Services",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldUnicode: false,
                oldMaxLength: 200,
                oldDefaultValue: "https://th.bing.com/th/id/OIP.ITpfvpcflBQwxt--PL_WegHaEc?w=252&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7");

            migrationBuilder.AddColumn<TimeOnly>(
                name: "EstimatedTime",
                table: "Services",
                type: "time",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsPrepayment",
                table: "Services",
                type: "bit",
                nullable: true,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ParentServiceId",
                table: "Services",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Rating",
                table: "Services",
                type: "decimal(3,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RatingCount",
                table: "Services",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RoomType",
                table: "Rooms",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldUnicode: false,
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "RoomName",
                table: "Rooms",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldUnicode: false,
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Location",
                table: "Rooms",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldUnicode: false,
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Roles",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "Roles",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "RoleName",
                table: "Roles",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Reservations",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(20)",
                oldUnicode: false,
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "Reason",
                table: "Reservations",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PriorExaminationImg",
                table: "Reservations",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldUnicode: false,
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CancellationReason",
                table: "Reservations",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldUnicode: false,
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Rank",
                table: "Patients",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                defaultValueSql: "(NULL)",
                oldClrType: typeof(string),
                oldType: "varchar(10)",
                oldUnicode: false,
                oldMaxLength: 10,
                oldNullable: true,
                oldDefaultValueSql: "(NULL)");

            migrationBuilder.AddColumn<int>(
                name: "GuardianId",
                table: "Patients",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "TreatmentPlan",
                table: "MedicalRecords",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Symptoms",
                table: "MedicalRecords",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "MedicalRecords",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Diagnosis",
                table: "MedicalRecords",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ServiceFeedbackContent",
                table: "Feedbacks",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "DoctorFeedbackContent",
                table: "Feedbacks",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<int>(
                name: "ServiceId",
                table: "Feedbacks",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DayOfWeek",
                table: "DoctorSchedules",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(10)",
                oldUnicode: false,
                oldMaxLength: 10);

            migrationBuilder.AlterColumn<string>(
                name: "WorkExperience",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "TrainingProcess",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ResearchProject",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Prize",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Organization",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DoctorDescription",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Degree",
                table: "Doctors",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldUnicode: false,
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CurrentWork",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AcademicTitle",
                table: "Doctors",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldUnicode: false,
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Devices",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldUnicode: false,
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "Functionality",
                table: "Devices",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Devices",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK__Users__1788CC4C3AD105FF",
                table: "Users",
                column: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Specialt__D768F6A84CECEB03",
                table: "Specialties",
                column: "SpecialtyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Slots__0A124AAF8BB79851",
                table: "Slots",
                column: "SlotId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Services__C51BB00AD6C7F0C2",
                table: "Services",
                column: "ServiceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Rooms__32863939270C0522",
                table: "Rooms",
                column: "RoomId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Roles__8AFACE1AAEA5EBEC",
                table: "Roles",
                column: "RoleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Reservat__B7EE5F249C0A4C24",
                table: "Reservations",
                column: "ReservationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Patients__970EC3660F695A77",
                table: "Patients",
                column: "PatientId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__MedicalR__4411BA2280374231",
                table: "MedicalRecords",
                column: "MedicalRecordId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Feedback__6A4BEDD68FA0D73F",
                table: "Feedbacks",
                column: "FeedbackId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__DoctorSp__B0B681D5876997B1",
                table: "DoctorSpecialties",
                columns: new[] { "DoctorId", "SpecialtyId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK__DoctorSe__9191B5BF27529F64",
                table: "DoctorServices",
                columns: new[] { "DoctorId", "ServiceId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK__DoctorSc__8B4DFC5C61E6F931",
                table: "DoctorSchedules",
                column: "DoctorScheduleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Doctors__2DC00EBFAFB5BA47",
                table: "Doctors",
                column: "DoctorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__DeviceSe__C185A23BEA8646A2",
                table: "DeviceServices",
                columns: new[] { "ServiceId", "DeviceId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK__Devices__49E12311CA0D38A2",
                table: "Devices",
                column: "DeviceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Certific__1237E58A80003FAC",
                table: "Certifications",
                column: "CertificationId");

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    PostId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PostAuthorId = table.Column<int>(type: "int", nullable: true, defaultValueSql: "(NULL)"),
                    PostTitle = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    PostDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostCreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    PostSourceUrl = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: true, defaultValueSql: "(NULL)")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Posts__AA1260181D859ECC", x => x.PostId);
                    table.ForeignKey(
                        name: "Post_FK",
                        column: x => x.PostAuthorId,
                        principalTable: "Doctors",
                        principalColumn: "DoctorId");
                });

            migrationBuilder.CreateTable(
                name: "Receptionists",
                columns: table => new
                {
                    ReceptionistId = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Shift = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true, defaultValue: "Ca sáng"),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true, defaultValue: "Đang làm việc")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Receptio__0F8C20A8B2BDF798", x => x.ReceptionistId);
                    table.ForeignKey(
                        name: "FK_Receptionists_User",
                        column: x => x.ReceptionistId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "ReservationDoctorSchedules",
                columns: table => new
                {
                    DoctorScheduleId = table.Column<int>(type: "int", nullable: false),
                    ReservationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Reservat__D03319AE3263198D", x => new { x.DoctorScheduleId, x.ReservationId });
                    table.ForeignKey(
                        name: "FK_DoctorSchedule",
                        column: x => x.DoctorScheduleId,
                        principalTable: "DoctorSchedules",
                        principalColumn: "DoctorScheduleId");
                    table.ForeignKey(
                        name: "FK_Reservation",
                        column: x => x.ReservationId,
                        principalTable: "Reservations",
                        principalColumn: "ReservationId");
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    CommentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    CommentOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RepliedCommentId = table.Column<int>(type: "int", nullable: true),
                    NumberOfLikes = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Comments__C3B4DFCAA6E322B2", x => x.CommentId);
                    table.ForeignKey(
                        name: "FK_Comments_Post",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "PostId");
                    table.ForeignKey(
                        name: "FK_Comments_User",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "PostSections",
                columns: table => new
                {
                    SectionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    SectionTitle = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    SectionContent = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SectionIndex = table.Column<int>(type: "int", nullable: false),
                    PostImageUrl = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: true, defaultValueSql: "(NULL)")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PostSect__80EF0872D37C2B56", x => x.SectionId);
                    table.ForeignKey(
                        name: "Section_FK1",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "PostId");
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    PaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ReservationId = table.Column<int>(type: "int", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    ReceptionistId = table.Column<int>(type: "int", nullable: true, defaultValueSql: "(NULL)"),
                    PaymentMethod = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PaymentStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TransactionId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true, defaultValueSql: "(NULL)"),
                    Amount = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Payments__9B556A380941252E", x => x.PaymentId);
                    table.ForeignKey(
                        name: "FK_Payments_Receptionist",
                        column: x => x.ReceptionistId,
                        principalTable: "Receptionists",
                        principalColumn: "ReceptionistId");
                    table.ForeignKey(
                        name: "FK_Payments_Reservation",
                        column: x => x.ReservationId,
                        principalTable: "Reservations",
                        principalColumn: "ReservationId");
                    table.ForeignKey(
                        name: "FK_Payments_User",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateIndex(
                name: "Phone_Unique",
                table: "Users",
                column: "Phone",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Services_ParentServiceId",
                table: "Services",
                column: "ParentServiceId");

            migrationBuilder.CreateIndex(
                name: "RoleName_Unique",
                table: "Roles",
                column: "RoleName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Patients_GuardianId",
                table: "Patients",
                column: "GuardianId");

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_ServiceId",
                table: "Feedbacks",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_PostId",
                table: "Comments",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UserId",
                table: "Comments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_ReceptionistId",
                table: "Payments",
                column: "ReceptionistId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_ReservationId",
                table: "Payments",
                column: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_UserId",
                table: "Payments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_PostAuthorId",
                table: "Posts",
                column: "PostAuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_PostSections_PostId",
                table: "PostSections",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationDoctorSchedules_ReservationId",
                table: "ReservationDoctorSchedules",
                column: "ReservationId");

            migrationBuilder.AddForeignKey(
                name: "FK__DeviceSer__Devic__74AE54BC",
                table: "DeviceServices",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "DeviceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__DeviceSer__Servi__73BA3083",
                table: "DeviceServices",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "Doctor_FK",
                table: "Doctors",
                column: "DoctorId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK__DoctorSer__Docto__778AC167",
                table: "DoctorServices",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "DoctorId");

            migrationBuilder.AddForeignKey(
                name: "FK__DoctorSer__Servi__787EE5A0",
                table: "DoctorServices",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK__DoctorSpe__Docto__5441852A",
                table: "DoctorSpecialties",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "DoctorId");

            migrationBuilder.AddForeignKey(
                name: "FK__DoctorSpe__Speci__5535A963",
                table: "DoctorSpecialties",
                column: "SpecialtyId",
                principalTable: "Specialties",
                principalColumn: "SpecialtyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Service",
                table: "Feedbacks",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "Guardian_FK",
                table: "Patients",
                column: "GuardianId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "Patient_FK",
                table: "Patients",
                column: "PatientId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleClaims_Roles_RoleId",
                table: "RoleClaims",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "RoleId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__Services__Parent__628FA481",
                table: "Services",
                column: "ParentServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK__Services__Specia__6383C8BA",
                table: "Services",
                column: "SpecialtyId",
                principalTable: "Specialties",
                principalColumn: "SpecialtyId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserClaims_Users_UserId",
                table: "UserClaims",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLogins_Users_UserId",
                table: "UserLogins",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Roles_RoleId",
                table: "UserRoles",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "RoleId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Users_UserId",
                table: "UserRoles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTokens_Users_UserId",
                table: "UserTokens",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__DeviceSer__Devic__74AE54BC",
                table: "DeviceServices");

            migrationBuilder.DropForeignKey(
                name: "FK__DeviceSer__Servi__73BA3083",
                table: "DeviceServices");

            migrationBuilder.DropForeignKey(
                name: "Doctor_FK",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK__DoctorSer__Docto__778AC167",
                table: "DoctorServices");

            migrationBuilder.DropForeignKey(
                name: "FK__DoctorSer__Servi__787EE5A0",
                table: "DoctorServices");

            migrationBuilder.DropForeignKey(
                name: "FK__DoctorSpe__Docto__5441852A",
                table: "DoctorSpecialties");

            migrationBuilder.DropForeignKey(
                name: "FK__DoctorSpe__Speci__5535A963",
                table: "DoctorSpecialties");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Service",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "Guardian_FK",
                table: "Patients");

            migrationBuilder.DropForeignKey(
                name: "Patient_FK",
                table: "Patients");

            migrationBuilder.DropForeignKey(
                name: "FK_RoleClaims_Roles_RoleId",
                table: "RoleClaims");

            migrationBuilder.DropForeignKey(
                name: "FK__Services__Parent__628FA481",
                table: "Services");

            migrationBuilder.DropForeignKey(
                name: "FK__Services__Specia__6383C8BA",
                table: "Services");

            migrationBuilder.DropForeignKey(
                name: "FK_UserClaims_Users_UserId",
                table: "UserClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_UserLogins_Users_UserId",
                table: "UserLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Roles_RoleId",
                table: "UserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Users_UserId",
                table: "UserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTokens_Users_UserId",
                table: "UserTokens");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "PostSections");

            migrationBuilder.DropTable(
                name: "ReservationDoctorSchedules");

            migrationBuilder.DropTable(
                name: "Receptionists");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Users__1788CC4C3AD105FF",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "Phone_Unique",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Specialt__D768F6A84CECEB03",
                table: "Specialties");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Slots__0A124AAF8BB79851",
                table: "Slots");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Services__C51BB00AD6C7F0C2",
                table: "Services");

            migrationBuilder.DropIndex(
                name: "IX_Services_ParentServiceId",
                table: "Services");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Rooms__32863939270C0522",
                table: "Rooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Roles__8AFACE1AAEA5EBEC",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "RoleName_Unique",
                table: "Roles");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Reservat__B7EE5F249C0A4C24",
                table: "Reservations");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Patients__970EC3660F695A77",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Patients_GuardianId",
                table: "Patients");

            migrationBuilder.DropPrimaryKey(
                name: "PK__MedicalR__4411BA2280374231",
                table: "MedicalRecords");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Feedback__6A4BEDD68FA0D73F",
                table: "Feedbacks");

            migrationBuilder.DropIndex(
                name: "IX_Feedbacks_ServiceId",
                table: "Feedbacks");

            migrationBuilder.DropPrimaryKey(
                name: "PK__DoctorSp__B0B681D5876997B1",
                table: "DoctorSpecialties");

            migrationBuilder.DropPrimaryKey(
                name: "PK__DoctorSe__9191B5BF27529F64",
                table: "DoctorServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK__DoctorSc__8B4DFC5C61E6F931",
                table: "DoctorSchedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Doctors__2DC00EBFAFB5BA47",
                table: "Doctors");

            migrationBuilder.DropPrimaryKey(
                name: "PK__DeviceSe__C185A23BEA8646A2",
                table: "DeviceServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Devices__49E12311CA0D38A2",
                table: "Devices");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Certific__1237E58A80003FAC",
                table: "Certifications");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EstimatedTime",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "IsPrepayment",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "ParentServiceId",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "RatingCount",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "RoleName",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "GuardianId",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "ServiceId",
                table: "Feedbacks");

            migrationBuilder.RenameIndex(
                name: "UQ__Feedback__B7EE5F2576E44458",
                table: "Feedbacks",
                newName: "IX_Feedbacks_ReservationId");

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "Users",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "Users",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsVerify",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true,
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<string>(
                name: "Gender",
                table: "Users",
                type: "varchar(6)",
                unicode: false,
                maxLength: 6,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(6)",
                oldMaxLength: 6,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "varchar(30)",
                unicode: false,
                maxLength: 30,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldUnicode: false,
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<DateOnly>(
                name: "Dob",
                table: "Users",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "CitizenId",
                table: "Users",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AvatarUrl",
                table: "Users",
                type: "varchar(200)",
                unicode: false,
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Users",
                type: "varchar(100)",
                unicode: false,
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Users",
                type: "varchar(50)",
                unicode: false,
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "SpecialtyName",
                table: "Specialties",
                type: "varchar(100)",
                unicode: false,
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "SpecialtyDescription",
                table: "Specialties",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "TreatmentTechniques",
                table: "Services",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ServiceName",
                table: "Services",
                type: "varchar(30)",
                unicode: false,
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Process",
                table: "Services",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Overview",
                table: "Services",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Services",
                type: "varchar(200)",
                unicode: false,
                maxLength: 200,
                nullable: false,
                defaultValue: "https://th.bing.com/th/id/OIP.ITpfvpcflBQwxt--PL_WegHaEc?w=252&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Services",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "RoomType",
                table: "Rooms",
                type: "varchar(50)",
                unicode: false,
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "RoomName",
                table: "Rooms",
                type: "varchar(100)",
                unicode: false,
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Location",
                table: "Rooms",
                type: "varchar(255)",
                unicode: false,
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Roles",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Reservations",
                type: "varchar(20)",
                unicode: false,
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "Reason",
                table: "Reservations",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PriorExaminationImg",
                table: "Reservations",
                type: "varchar(200)",
                unicode: false,
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CancellationReason",
                table: "Reservations",
                type: "varchar(255)",
                unicode: false,
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DoctorScheduleId",
                table: "Reservations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Rank",
                table: "Patients",
                type: "varchar(10)",
                unicode: false,
                maxLength: 10,
                nullable: true,
                defaultValueSql: "(NULL)",
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true,
                oldDefaultValueSql: "(NULL)");

            migrationBuilder.AlterColumn<string>(
                name: "TreatmentPlan",
                table: "MedicalRecords",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Symptoms",
                table: "MedicalRecords",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "MedicalRecords",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Diagnosis",
                table: "MedicalRecords",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ServiceFeedbackContent",
                table: "Feedbacks",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "DoctorFeedbackContent",
                table: "Feedbacks",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "DayOfWeek",
                table: "DoctorSchedules",
                type: "varchar(10)",
                unicode: false,
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10);

            migrationBuilder.AlterColumn<string>(
                name: "WorkExperience",
                table: "Doctors",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "TrainingProcess",
                table: "Doctors",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ResearchProject",
                table: "Doctors",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Prize",
                table: "Doctors",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Organization",
                table: "Doctors",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DoctorDescription",
                table: "Doctors",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Degree",
                table: "Doctors",
                type: "varchar(50)",
                unicode: false,
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CurrentWork",
                table: "Doctors",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AcademicTitle",
                table: "Doctors",
                type: "varchar(50)",
                unicode: false,
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Devices",
                type: "varchar(255)",
                unicode: false,
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "Functionality",
                table: "Devices",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Devices",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Specialt__D768F6A828B9E8B3",
                table: "Specialties",
                column: "SpecialtyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Slots__0A124AAF03E41AA4",
                table: "Slots",
                column: "SlotId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Services__C51BB00AA5CD56C8",
                table: "Services",
                column: "ServiceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Rooms__328639393390FD2C",
                table: "Rooms",
                column: "RoomId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Roles",
                table: "Roles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Reservat__B7EE5F24B93F8BE2",
                table: "Reservations",
                column: "ReservationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Patients__970EC3666A4E94A9",
                table: "Patients",
                column: "PatientId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__MedicalR__4411BA220AFBCBE9",
                table: "MedicalRecords",
                column: "MedicalRecordId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Feedback__6A4BEDD6B9B76644",
                table: "Feedbacks",
                column: "FeedbackId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__DoctorSp__B0B681D58FD60A70",
                table: "DoctorSpecialties",
                columns: new[] { "DoctorId", "SpecialtyId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK__DoctorSe__9191B5BFE26F8888",
                table: "DoctorServices",
                columns: new[] { "DoctorId", "ServiceId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK__DoctorSc__8B4DFC5C74A646E3",
                table: "DoctorSchedules",
                column: "DoctorScheduleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Doctors__2DC00EBFB42CF4E4",
                table: "Doctors",
                column: "DoctorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__DeviceSe__C185A23B1C17D30A",
                table: "DeviceServices",
                columns: new[] { "ServiceId", "DeviceId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK__Devices__49E1231180B6D9C3",
                table: "Devices",
                column: "DeviceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Certific__1237E58A3720D143",
                table: "Certifications",
                column: "CertificationId");

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
                    Image = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Categori__19093A0BFFF2A0D1", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "DeviceSpecialties",
                columns: table => new
                {
                    SpecialtyId = table.Column<int>(type: "int", nullable: false),
                    DeviceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__DeviceSp__D3F6E499279A3B83", x => new { x.SpecialtyId, x.DeviceId });
                    table.ForeignKey(
                        name: "FK__DeviceSpe__Devic__45F365D3",
                        column: x => x.DeviceId,
                        principalTable: "Devices",
                        principalColumn: "DeviceId");
                    table.ForeignKey(
                        name: "FK__DeviceSpe__Speci__44FF419A",
                        column: x => x.SpecialtyId,
                        principalTable: "Specialties",
                        principalColumn: "SpecialtyId");
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { 1, "acccef8b-20f3-4de0-8ee9-5a3690f094ed", "Patient", "PATIENT" },
                    { 2, "1a777fbf-24db-4247-bd76-db376d703ea9", "Doctor", "DOCTOR" }
                });

            migrationBuilder.CreateIndex(
                name: "CitizenId_Unique",
                table: "Users",
                column: "CitizenId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "Email_Unique",
                table: "Users",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "Phone_Unique",
                table: "Users",
                column: "PhoneNumber",
                unique: true,
                filter: "[PhoneNumber] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Services_CategoryId",
                table: "Services",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_DoctorScheduleId",
                table: "Reservations",
                column: "DoctorScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_DeviceSpecialties_DeviceId",
                table: "DeviceSpecialties",
                column: "DeviceId");

            migrationBuilder.AddForeignKey(
                name: "FK__DeviceSer__Devic__68487DD7",
                table: "DeviceServices",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "DeviceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__DeviceSer__Servi__6754599E",
                table: "DeviceServices",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "Doctor_FK",
                table: "Doctors",
                column: "DoctorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK__DoctorSer__Docto__6B24EA82",
                table: "DoctorServices",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "DoctorId");

            migrationBuilder.AddForeignKey(
                name: "FK__DoctorSer__Servi__6C190EBB",
                table: "DoctorServices",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK__DoctorSpe__Docto__4BAC3F29",
                table: "DoctorSpecialties",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "DoctorId");

            migrationBuilder.AddForeignKey(
                name: "FK__DoctorSpe__Speci__4CA06362",
                table: "DoctorSpecialties",
                column: "SpecialtyId",
                principalTable: "Specialties",
                principalColumn: "SpecialtyId");

            migrationBuilder.AddForeignKey(
                name: "Patient_FK",
                table: "Patients",
                column: "PatientId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "DoctorScheduleId_FK",
                table: "Reservations",
                column: "DoctorScheduleId",
                principalTable: "DoctorSchedules",
                principalColumn: "DoctorScheduleId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleClaims_Roles_RoleId",
                table: "RoleClaims",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "CategoryId_FK",
                table: "Services",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "SpecialtyId_FK",
                table: "Services",
                column: "SpecialtyId",
                principalTable: "Specialties",
                principalColumn: "SpecialtyId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserClaims_Users_UserId",
                table: "UserClaims",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLogins_Users_UserId",
                table: "UserLogins",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Roles_RoleId",
                table: "UserRoles",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Users_UserId",
                table: "UserRoles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTokens_Users_UserId",
                table: "UserTokens",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
