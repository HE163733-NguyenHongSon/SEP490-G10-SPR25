using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Application.Services
{
    public class PdfReportService
    {
        [Obsolete]
        public byte[] GenerateMedicalReport(MedicalReportData data)
        {
            QuestPDF.Settings.License = LicenseType.Community;

            var document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);
                    page.DefaultTextStyle(x => x.FontSize(11));

                    // Header - Thông tin bệnh viện
                    page.Header()
                        .Column(column =>
                        {
                            column.Item().AlignCenter().Text("HAS HOSPITAL").Bold().FontSize(16);
                            column.Item().AlignCenter().Text("SDT: 0123 469 789");
                            column.Item().AlignCenter().Text("Địa chỉ: 123 Đường ABC, TP XYZ");
                            column.Item().PaddingTop(10).LineHorizontal(1).LineColor(Colors.Grey.Medium);
                        });

                    // Content
                    page.Content()
                        .PaddingVertical(10)
                        .Column(column =>
                        {
                            // Phần 1: Thông tin bệnh nhân
                            column.Item().Stack(stack =>
                            {
                                stack.Item().Text("THÔNG TIN BỆNH NHÂN").Bold().FontSize(14);

                                stack.Item().Table(table =>
                                {
                                    table.ColumnsDefinition(columns =>
                                    {
                                        columns.RelativeColumn();
                                        columns.RelativeColumn();
                                    });

                                    // Dữ liệu
                                    table.Cell().Text("Họ và tên");
                                    table.Cell().Text(data.PatientInfo.FullName);

                                    table.Cell().Text("Ngày sinh");
                                    table.Cell().Text(data.PatientInfo.DateOfBirth.ToString("dd/MM/yyyy"));

                                    table.Cell().Text("Giới tính");
                                    table.Cell().Text(data.PatientInfo.Gender);

                                    table.Cell().Text("SĐT");
                                    table.Cell().Text(data.PatientInfo.PhoneNumber);

                                    // Địa chỉ chiếm 2 cột
                                    table.Cell().ColumnSpan(2).Text("Địa chỉ: " + data.PatientInfo.Address);
                                });
                            });

                            // Phần 2: Tóm tắt y tế
                            column.Item().Stack(stack =>
                            {
                                stack.Item().Text("TÓM TẮT Y TẾ").Bold().FontSize(14);

                                stack.Item().Grid(grid =>
                                {
                                    grid.Columns(2);
                                    grid.Spacing(5);

                                    grid.Item().Text("Tổng lượt khám");
                                    grid.Item().Text(data.MedicalSummary.TotalVisits.ToString());

                                    grid.Item().Text("Lần khám gần nhất");
                                    grid.Item().Text(data.MedicalSummary.LastVisitDate.ToString("dd/MM/yyyy"));

                                    grid.Item().Text("Tình trạng chính");
                                    grid.Item().Text(data.MedicalSummary.MainCondition);
                                });
                            });

                            // Phần 3: Danh sách hồ sơ y tế
                            column.Item().Stack(stack =>
                            {
                                stack.Item().Text("DANH SÁCH HỒ SƠ Y TẾ").Bold().FontSize(14);

                                stack.Item().Table(table =>
                                {
                                    // Định nghĩa cột
                                    table.ColumnsDefinition(columns =>
                                    {
                                        columns.ConstantColumn(35); // Mã
                                        columns.ConstantColumn(80); // Ngày hẹn
                                        columns.RelativeColumn(2); // Thông tin
                                        columns.ConstantColumn(80); // Tái khám
                                        columns.RelativeColumn(); // Ghi chú
                                    });

                                    // Tiêu đề bảng
                                    table.Header(header =>
                                    {
                                        header.Cell().Text("Mã").Medium();
                                        header.Cell().Text("Ngày hẹn").Medium();
                                        header.Cell().Text("Thông tin khám").Medium();
                                        header.Cell().Text("Tái khám").Medium();
                                        header.Cell().Text("Ghi chú").Medium();

                                        header.Cell().ColumnSpan(5).PaddingTop(5).LineHorizontal(1).LineColor(Colors.Grey.Lighten1);
                                    });

                                    // Dữ liệu
                                    foreach (var record in data.MedicalRecords)
                                    {
                                        table.Cell().Text(record.Id.ToString());
                                        table.Cell().Text(record.AppointmentDate.ToString("dd/MM/yyyy HH:mm"));

                                        table.Cell().PaddingVertical(5).Text(text =>
                                        {
                                            text.Span("Triệu chứng: ").SemiBold();
                                            text.Span(record.Symptoms);
                                            text.EmptyLine();
                                            text.Span("Chẩn đoán: ").SemiBold();
                                            text.Span(record.Diagnosis);
                                            text.EmptyLine();
                                            text.Span("Điều trị: ").SemiBold();
                                            text.Span(record.Treatment);
                                        });

                                        table.Cell().Text(record.FollowUpDate.HasValue
                                            ? record.FollowUpDate.Value.ToString("dd/MM/yyyy")
                                            : "Không có");

                                        table.Cell().Text(record.Notes);

                                        table.Cell().ColumnSpan(5).PaddingTop(5).LineHorizontal(0.5f).LineColor(Colors.Grey.Lighten2);
                                    }
                                });
                            });
                        });

                    // Footer
                    page.Footer()
                        .AlignCenter()
                        .Text(text =>
                        {
                            text.Span("Ngày xuất báo cáo: ");
                            text.Span(DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
                        });
                });
            });

            return document.GeneratePdf();
        }

    }

    public class MedicalReportData
    {
        public PatientInfo PatientInfo { get; set; }
        public MedicalSummary MedicalSummary { get; set; }
        public List<MedicalRecord> MedicalRecords { get; set; }
    }

    public class PatientInfo
    {
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public bool IsInsuranceVerified { get; set; }
    }

    public class MedicalSummary
    {
        public string TotalVisits { get; set; }
        public DateTime LastVisitDate { get; set; }
        public string LastVisitStatus { get; set; }
        public string MainCondition { get; set; }
        public string ProgressStatus { get; set; }
    }

    public class MedicalRecord
    {
        public int Id { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string Symptoms { get; set; }
        public string Diagnosis { get; set; }
        public string Treatment { get; set; }
        public DateTime? FollowUpDate { get; set; }
        public string Notes { get; set; }
    }
}