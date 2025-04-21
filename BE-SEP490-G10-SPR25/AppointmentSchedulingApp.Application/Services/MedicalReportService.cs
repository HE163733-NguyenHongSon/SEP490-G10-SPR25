using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AutoMapper;
using QuestPDF.Infrastructure;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using QuestPDF.Previewer;
using QuestPDF.Companion;

namespace AppointmentSchedulingApp.Application.Services
{
    public class MedicalReportService : IMedicalReportService

    {
        public readonly IMapper mapper;

        public IUnitOfWork unitOfWork { get; set; }
        public MedicalReportService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        public async Task<MedicalReportDTO> GetMedicalReportByPatientId(int patientId)
        {
            var patient = await unitOfWork.UserRepository.Get(p => p.UserId.Equals(patientId));
            return mapper.Map<MedicalReportDTO>(patient);
        }
        [Obsolete]
        public async Task<byte[]> GenerateMedicalReportPdf(MedicalReportDTO data)
        {
            QuestPDF.Settings.License = LicenseType.Community;

            // Load patient image
            byte[] imageBytes = null;
            try
            {
                if (!string.IsNullOrEmpty(data.Patient.AvatarUrl))
                {
                    using var httpClient = new HttpClient { Timeout = TimeSpan.FromSeconds(5) };
                    imageBytes = await httpClient.GetByteArrayAsync(
                        $"https://sep490-g10-spr25.s3.ap-southeast-2.amazonaws.com/{data.Patient.AvatarUrl}");
                }
            }
            catch
            {
                // Use placeholder if failed to load image
            }

            var document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(1, Unit.Centimetre);
                    page.DefaultTextStyle(x => x.FontSize(11));

                    // Header
                    page.Header().Row(row =>
                    {
                        // Hospital Info
                        row.RelativeColumn().Column(column =>
                        {
                            column.Item().Text("HAS HOSPITAL").Bold().FontSize(16);
                            column.Item().Text("SDT: 0123 469 789");
                            column.Item().Text("Địa chỉ: 123 Đường ABC, TP XYZ");
                        });

                        // Patient Info
                        row.RelativeColumn().AlignRight().Column(column =>
                        {
                            column.Item().Row(innerRow =>
                            {
                                innerRow.ConstantColumn(60).Height(60).Element(e =>
                                {
                                    if (imageBytes != null)
                                        e.Image(imageBytes).FitArea();
                                });

                                innerRow.RelativeColumn().PaddingLeft(5).PaddingVertical(10).Column(infoCol =>
                                {
                                    infoCol.Item().Text("Tên bệnh nhân: " + data.Patient.UserName).FontSize(12);
                                    infoCol.Item().Text($"Khám từ: {data.FirstVisitFormatted} - {data.LastVisitFormatted}").FontSize(12);
                                });
                            });
                        });
                    });

                    // Content
                    page.Content().PaddingVertical(15).Column(column =>
                    {
                        column.Item().Row(row =>
                        {
                            // Patient Details
                            row.RelativeItem().Background(Colors.Grey.Lighten5).Border(1)
                                .BorderColor(Colors.Grey.Lighten2).Padding(10).Stack(stack =>
                                {
                                    stack.Item().PaddingBottom(20).Text("THÔNG TIN BỆNH NHÂN").Bold().FontSize(10);

                                    stack.Item().Table(table =>
                                    {
                                        table.ColumnsDefinition(columns =>
                                        {
                                            columns.RelativeColumn();
                                            columns.RelativeColumn();
                                        });
                                        
                                        table.Cell().ColumnSpan(2).Text($"Họ và tên: {data.Patient.UserName}");
                                        table.Cell().ColumnSpan(2).PaddingTop(3).Text($"CMND: {data.Patient.CitizenId}");

                                        table.Cell().ColumnSpan(2).PaddingTop(3).Text($"Ngày sinh: {data.Patient.Dob}");
                                        table.Cell().ColumnSpan(2).PaddingTop(3).Text($"Giới tính: {data.Patient.Gender}");
                                        table.Cell().ColumnSpan(2).PaddingTop(3).Text($"SĐT: {data.Patient.Phone}");
                                        table.Cell().ColumnSpan(2).PaddingTop(3).Text($"Email: {data.Patient.Email}");


                                        table.Cell().ColumnSpan(2).PaddingTop(3).Text("Địa chỉ: " + data.Patient.Address);
                                    });
                                });

                            // Medical Summary
                            row.RelativeItem().Background(Colors.Grey.Lighten5).Border(1)
                                .BorderColor(Colors.Grey.Lighten2).Padding(10).Stack(stack =>
                                {
                                    stack.Item().PaddingBottom(20).Text("TÓM TẮT Y TẾ").Bold().FontSize(10);

                                    stack.Item().Grid(grid =>
                                    {
                                        grid.Columns(1); // Chỉ 1 cột để hiển thị mỗi dòng đầy đủ
                                        grid.Spacing(5);

                                        grid.Item().Text($"Tổng lượt khám: {data.NumberOfVisits}");
                                        grid.Item().Text($"Khám bệnh từ: {data.FirstVisitFormatted}");
                                        grid.Item().Text($"Lần khám gần nhất: {data.LastVisitFormatted}");
                                        grid.Item().Text($"Tình trạng chính: {data.Patient.MainCondition}");
                                    });

                                });
                        });

                        // Medical Records
                        column.Item().Stack(stack =>
                        {
                            stack.Item().Column(column =>
                            {
                                column.Item().PaddingVertical(20).Background(Colors.Grey.Lighten5).Border(1)
                                .BorderColor(Colors.Grey.Lighten2).Padding(10).Text("DANH SÁCH HỒ SƠ Y TẾ")
                                    .Bold()
                                    .FontSize(10).AlignCenter();
                            });


                            stack.Item().Table(table =>
                            {
                                table.ColumnsDefinition(columns =>
                                {
                                    columns.ConstantColumn(80);   // ID
                                    columns.ConstantColumn(80);   // Appointment Date
                                    columns.RelativeColumn(2);    // Info
                                    columns.ConstantColumn(80);   // Follow-up
                                    columns.RelativeColumn();     // Notes
                                });

                                // Table header
                                table.Header(header =>
                                {
                                    header.Cell().Text("Lịch hẹn khám").Medium();
                                    header.Cell().Text("Ngày hẹn").Medium();
                                    header.Cell().PaddingHorizontal(10).Text("Thông tin khám").Medium();
                                    header.Cell().Text("Tái khám").Medium();
                                    header.Cell().Text("Ghi chú").Medium();

                                    header.Cell().ColumnSpan(5).PaddingTop(5)
                                        .LineHorizontal(1).LineColor(Colors.Grey.Lighten1);
                                });

                                // Table data
                                foreach (var record in data.MedicalRecords)
                                {
                                    table.Cell().PaddingVertical(15).PaddingHorizontal(15).Text(record.ReservationId);
                                    table.Cell().PaddingVertical(15).Text(record.AppointmentDate);

                                    table.Cell().PaddingVertical(5).PaddingHorizontal(10).Text(text =>
                                    {
                                        text.Span("Triệu chứng: ").SemiBold();
                                        text.Span(record.Symptoms);
                                        text.EmptyLine(); // Dòng trống
                                        text.EmptyLine(); // Thêm 1 dòng trống nữa

                                        text.Span("Chẩn đoán: ").SemiBold();
                                        text.Span(record.Diagnosis);
                                        text.EmptyLine();
                                        text.EmptyLine();

                                        text.Span("Điều trị: ").SemiBold();
                                        text.Span(record.TreatmentPlan);
                                    });


                                    table.Cell().PaddingVertical(15).Text(record.FollowUpDate.HasValue
                                        ? record.FollowUpDate.Value.ToString("dd/MM/yyyy")
                                        : "Bệnh nhân không cần tái khám");

                                    table.Cell().PaddingVertical(15).Text(record.Notes);

                                    table.Cell().ColumnSpan(5).PaddingTop(5)
                                        .LineHorizontal(0.5f).LineColor(Colors.Grey.Lighten2);
                                }
                            });
                        });
                    });

                    // Footer
                    page.Footer().PaddingTop(10).Column(column =>
                    {
                        column.Item().PaddingTop(10).AlignLeft().Text(text =>
                        {
                            text.Span("Ngày xuất báo cáo: ");
                            text.Span(DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
                        });

                        column.Item().PaddingTop(10).AlignRight().Text(text =>
                        {
                            text.Span("Người đại diện bệnh viện").SemiBold();
                            text.Line("");
                            text.Line("");
                            text.Line("...................................");
                        });
                    });

                });
            });
            //await document.ShowInCompanionAsync(); //cài tool để test QuestPDF Companion tool

            return document.GeneratePdf();
        }

    }
}
