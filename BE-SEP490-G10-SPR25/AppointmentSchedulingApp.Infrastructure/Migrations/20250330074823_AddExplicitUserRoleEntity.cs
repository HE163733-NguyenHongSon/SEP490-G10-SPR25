using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppointmentSchedulingApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddExplicitUserRoleEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__DeviceSer__Devic__74AE54BC",
                table: "DeviceServices");

            migrationBuilder.DropForeignKey(
                name: "FK__DeviceSer__Servi__73BA3083",
                table: "DeviceServices");

            migrationBuilder.DropForeignKey(
                name: "FK__DoctorSer__Docto__778AC167",
                table: "DoctorServices");

            migrationBuilder.DropForeignKey(
                name: "FK__DoctorSer__Servi__787EE5A0",
                table: "DoctorServices");

            migrationBuilder.DropForeignKey(
                name: "FK__Services__Parent__628FA481",
                table: "Services");

            migrationBuilder.DropForeignKey(
                name: "FK__Services__Specia__6383C8BA",
                table: "Services");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Roles_RoleId",
                table: "UserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Users_UserId",
                table: "UserRoles");

            migrationBuilder.DropTable(
                name: "ReservationDoctorSchedules");

            migrationBuilder.DropTable(
                name: "RoleClaims");

            migrationBuilder.DropTable(
                name: "UserClaims");

            migrationBuilder.DropTable(
                name: "UserLogins");

            migrationBuilder.DropTable(
                name: "UserTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Users__1788CC4C3AD105FF",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "EmailIndex",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "UserNameIndex",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRoles",
                table: "UserRoles");

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
                name: "RoleNameIndex",
                table: "Roles");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Reservat__B7EE5F249C0A4C24",
                table: "Reservations");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Receptio__0F8C20A8B2BDF798",
                table: "Receptionists");

            migrationBuilder.DropPrimaryKey(
                name: "PK__PostSect__80EF0872D37C2B56",
                table: "PostSections");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Posts__AA1260181D859ECC",
                table: "Posts");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Payments__9B556A380941252E",
                table: "Payments");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Patients__970EC3660F695A77",
                table: "Patients");

            migrationBuilder.DropPrimaryKey(
                name: "PK__MedicalR__4411BA2280374231",
                table: "MedicalRecords");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Feedback__6A4BEDD68FA0D73F",
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
                name: "PK__Comments__C3B4DFCAA6E322B2",
                table: "Comments");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Certific__1237E58A80003FAC",
                table: "Certifications");

            migrationBuilder.DropColumn(
                name: "AccessFailedCount",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EmailConfirmed",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LockoutEnabled",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LockoutEnd",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NormalizedEmail",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NormalizedUserName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PhoneNumberConfirmed",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SecurityStamp",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TwoFactorEnabled",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ParentServiceId",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "NormalizedName",
                table: "Roles");

            migrationBuilder.RenameIndex(
                name: "UQ__Feedback__B7EE5F2576E44458",
                table: "Feedbacks",
                newName: "UQ__Feedback__B7EE5F25C721B5E5");

            migrationBuilder.AlterColumn<string>(
                name: "ServiceName",
                table: "Services",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<decimal>(
                name: "Rating",
                table: "Services",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(3,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Overview",
                table: "Services",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsPrepayment",
                table: "Services",
                type: "bit",
                nullable: true,
                defaultValueSql: "((0))",
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true,
                oldDefaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "DoctorScheduleId",
                table: "Reservations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTime",
                table: "Reservations",
                type: "datetime",
                nullable: false,
                defaultValueSql: "(getdate())");

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "Reservations",
                type: "datetime",
                nullable: false,
                defaultValueSql: "(getdate())");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Users__1788CC4C08BB0715",
                table: "Users",
                column: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__UserRole__AF2760AD0E8BF207",
                table: "UserRoles",
                columns: new[] { "UserId", "RoleId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK__Specialt__D768F6A80D2E07D8",
                table: "Specialties",
                column: "SpecialtyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Slots__0A124AAF0239F88E",
                table: "Slots",
                column: "SlotId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Services__C51BB00A2694A2ED",
                table: "Services",
                column: "ServiceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Rooms__32863939A48A4918",
                table: "Rooms",
                column: "RoomId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Roles__8AFACE1A557EF530",
                table: "Roles",
                column: "RoleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Reservat__B7EE5F24AFF1158C",
                table: "Reservations",
                column: "ReservationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Receptio__0F8C20A81DE4255C",
                table: "Receptionists",
                column: "ReceptionistId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__PostSect__80EF08722BF9FE52",
                table: "PostSections",
                column: "SectionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Posts__AA126018DCE7DADC",
                table: "Posts",
                column: "PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Payments__9B556A381812807C",
                table: "Payments",
                column: "PaymentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Patients__970EC3664AE6209D",
                table: "Patients",
                column: "PatientId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__MedicalR__4411BA22CCBEB984",
                table: "MedicalRecords",
                column: "MedicalRecordId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Feedback__6A4BEDD64AB1673C",
                table: "Feedbacks",
                column: "FeedbackId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__DoctorSp__B0B681D5D3C857AF",
                table: "DoctorSpecialties",
                columns: new[] { "DoctorId", "SpecialtyId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK__DoctorSe__9191B5BFFC89575F",
                table: "DoctorServices",
                columns: new[] { "DoctorId", "ServiceId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK__DoctorSc__8B4DFC5CD30BE55C",
                table: "DoctorSchedules",
                column: "DoctorScheduleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Doctors__2DC00EBF6F36E191",
                table: "Doctors",
                column: "DoctorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__DeviceSe__F48B92B8CA79423D",
                table: "DeviceServices",
                columns: new[] { "ServiceId", "DeviceId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK__Devices__49E123118980F03E",
                table: "Devices",
                column: "DeviceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Comments__C3B4DFCAAE40BEA3",
                table: "Comments",
                column: "CommentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Certific__1237E58AB741FCD4",
                table: "Certifications",
                column: "CertificationId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_DoctorScheduleId",
                table: "Reservations",
                column: "DoctorScheduleId");

            migrationBuilder.AddForeignKey(
                name: "FK__DeviceSer__Devic__70DDC3D8",
                table: "DeviceServices",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "DeviceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__DeviceSer__Servi__6FE99F9F",
                table: "DeviceServices",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__DoctorSer__Docto__75A278F5",
                table: "DoctorServices",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "DoctorId");

            migrationBuilder.AddForeignKey(
                name: "FK__DoctorSer__Servi__76969D2E",
                table: "DoctorServices",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_DoctorSchedule",
                table: "Reservations",
                column: "DoctorScheduleId",
                principalTable: "DoctorSchedules",
                principalColumn: "DoctorScheduleId");

            migrationBuilder.AddForeignKey(
                name: "FK__Services__Special__5CD6CB2B",
                table: "Services",
                column: "SpecialtyId",
                principalTable: "Specialties",
                principalColumn: "SpecialtyId");

            migrationBuilder.AddForeignKey(
                name: "Role_FK",
                table: "UserRoles",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "RoleId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "User_FK",
                table: "UserRoles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__DeviceSer__Devic__70DDC3D8",
                table: "DeviceServices");

            migrationBuilder.DropForeignKey(
                name: "FK__DeviceSer__Servi__6FE99F9F",
                table: "DeviceServices");

            migrationBuilder.DropForeignKey(
                name: "FK__DoctorSer__Docto__75A278F5",
                table: "DoctorServices");

            migrationBuilder.DropForeignKey(
                name: "FK__DoctorSer__Servi__76969D2E",
                table: "DoctorServices");

            migrationBuilder.DropForeignKey(
                name: "FK_DoctorSchedule",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK__Services__Special__5CD6CB2B",
                table: "Services");

            migrationBuilder.DropForeignKey(
                name: "Role_FK",
                table: "UserRoles");

            migrationBuilder.DropForeignKey(
                name: "User_FK",
                table: "UserRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Users__1788CC4C08BB0715",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK__UserRole__AF2760AD0E8BF207",
                table: "UserRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Specialt__D768F6A80D2E07D8",
                table: "Specialties");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Slots__0A124AAF0239F88E",
                table: "Slots");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Services__C51BB00A2694A2ED",
                table: "Services");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Rooms__32863939A48A4918",
                table: "Rooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Roles__8AFACE1A557EF530",
                table: "Roles");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Reservat__B7EE5F24AFF1158C",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_DoctorScheduleId",
                table: "Reservations");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Receptio__0F8C20A81DE4255C",
                table: "Receptionists");

            migrationBuilder.DropPrimaryKey(
                name: "PK__PostSect__80EF08722BF9FE52",
                table: "PostSections");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Posts__AA126018DCE7DADC",
                table: "Posts");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Payments__9B556A381812807C",
                table: "Payments");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Patients__970EC3664AE6209D",
                table: "Patients");

            migrationBuilder.DropPrimaryKey(
                name: "PK__MedicalR__4411BA22CCBEB984",
                table: "MedicalRecords");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Feedback__6A4BEDD64AB1673C",
                table: "Feedbacks");

            migrationBuilder.DropPrimaryKey(
                name: "PK__DoctorSp__B0B681D5D3C857AF",
                table: "DoctorSpecialties");

            migrationBuilder.DropPrimaryKey(
                name: "PK__DoctorSe__9191B5BFFC89575F",
                table: "DoctorServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK__DoctorSc__8B4DFC5CD30BE55C",
                table: "DoctorSchedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Doctors__2DC00EBF6F36E191",
                table: "Doctors");

            migrationBuilder.DropPrimaryKey(
                name: "PK__DeviceSe__F48B92B8CA79423D",
                table: "DeviceServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Devices__49E123118980F03E",
                table: "Devices");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Comments__C3B4DFCAAE40BEA3",
                table: "Comments");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Certific__1237E58AB741FCD4",
                table: "Certifications");

            migrationBuilder.DropColumn(
                name: "DoctorScheduleId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Reservations");

            migrationBuilder.RenameIndex(
                name: "UQ__Feedback__B7EE5F25C721B5E5",
                table: "Feedbacks",
                newName: "UQ__Feedback__B7EE5F2576E44458");

            migrationBuilder.AddColumn<int>(
                name: "AccessFailedCount",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmailConfirmed",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "LockoutEnabled",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LockoutEnd",
                table: "Users",
                type: "datetimeoffset",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedEmail",
                table: "Users",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedUserName",
                table: "Users",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PhoneNumberConfirmed",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "SecurityStamp",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "TwoFactorEnabled",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "ServiceName",
                table: "Services",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Rating",
                table: "Services",
                type: "decimal(3,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Overview",
                table: "Services",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsPrepayment",
                table: "Services",
                type: "bit",
                nullable: true,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true,
                oldDefaultValueSql: "((0))");

            migrationBuilder.AddColumn<int>(
                name: "ParentServiceId",
                table: "Services",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "Roles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Roles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Roles",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedName",
                table: "Roles",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK__Users__1788CC4C3AD105FF",
                table: "Users",
                column: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRoles",
                table: "UserRoles",
                columns: new[] { "UserId", "RoleId" });

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
                name: "PK__Receptio__0F8C20A8B2BDF798",
                table: "Receptionists",
                column: "ReceptionistId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__PostSect__80EF0872D37C2B56",
                table: "PostSections",
                column: "SectionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Posts__AA1260181D859ECC",
                table: "Posts",
                column: "PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Payments__9B556A380941252E",
                table: "Payments",
                column: "PaymentId");

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
                name: "PK__Comments__C3B4DFCAA6E322B2",
                table: "Comments",
                column: "CommentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Certific__1237E58A80003FAC",
                table: "Certifications",
                column: "CertificationId");

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
                name: "RoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleClaims_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserClaims_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_UserLogins_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTokens",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_UserTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "Users",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "Users",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Services_ParentServiceId",
                table: "Services",
                column: "ParentServiceId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "Roles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationDoctorSchedules_ReservationId",
                table: "ReservationDoctorSchedules",
                column: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleClaims_RoleId",
                table: "RoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserClaims_UserId",
                table: "UserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLogins_UserId",
                table: "UserLogins",
                column: "UserId");

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
        }
    }
}
