using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using FluentAssertions;

namespace AppointmentSchedulingApp.Application.Tests
{
    // Mock controller for testing
    public class MedicalRecordsController : ControllerBase
    {
        private readonly IMedicalRecordService _medicalRecordService;
        private readonly ILogger<MedicalRecordsController> _logger;

        public MedicalRecordsController(IMedicalRecordService medicalRecordService,
            ILogger<MedicalRecordsController> logger)
        {
            _medicalRecordService = medicalRecordService;
            _logger = logger;
        }

        public async Task<IActionResult> GetAllMedicalRecordByPatientId(int patientId)
        {
            try
            {
                var medicalRecords = await _medicalRecordService.GetAllMedicalRecordByPatientId(patientId);

                if (medicalRecords == null)
                {
                    _logger.LogWarning("FAIL: No medical records found for patient ID: {PatientId}", patientId);
                    return NotFound($"Bệnh nhân với ID={patientId} không có hồ sơ bệnh án nào cả!");
                }

                _logger.LogInformation("SUCCESS: Retrieved medical records for patient ID: {PatientId}", patientId);
                return Ok(medicalRecords);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERROR: Failed to retrieve medical records for patient ID: {PatientId}", patientId);
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!");
            }
        }
    }

    [TestFixture]
    public class MedicalRecordsControllerTests
    {
        private Mock<IMedicalRecordService> _mockMedicalRecordService;
        private Mock<ILogger<MedicalRecordsController>> _mockLogger;
        private MedicalRecordsController _controller;

        [SetUp]
        public void Setup()
        {
            _mockMedicalRecordService = new Mock<IMedicalRecordService>();
            _mockLogger = new Mock<ILogger<MedicalRecordsController>>();
            _controller = new MedicalRecordsController(
                _mockMedicalRecordService.Object,
                _mockLogger.Object);
        }

        [Test]
        public async Task GetAllMedicalRecordByPatientId_WhenPatientHasRecords_ReturnsOkResultWithRecords()
        {
            // Arrange
            int patientId = 1;
            var expectedRecords = new List<MedicalRecordDTO>
            {
                new MedicalRecordDTO { 
                    ReservationId = "1", 
                    AppointmentDate = "01/01/2023 09:00:00",
                    Symptoms = "Sốt, đau đầu",
                    Diagnosis = "Cúm mùa",
                    TreatmentPlan = "Nghỉ ngơi, uống nhiều nước" 
                },
                new MedicalRecordDTO { 
                    ReservationId = "2", 
                    AppointmentDate = "15/02/2023 10:30:00",
                    Symptoms = "Ho, đau họng",
                    Diagnosis = "Viêm họng",
                    TreatmentPlan = "Kháng sinh 7 ngày" 
                }
            };

            _mockMedicalRecordService
                .Setup(service => service.GetAllMedicalRecordByPatientId(patientId))
                .ReturnsAsync(expectedRecords);

            // Act
            var result = await _controller.GetAllMedicalRecordByPatientId(patientId);

            // Assert
            // Kiểm tra kiểu trả về
            result.Should().BeOfType<OkObjectResult>();
            
            // Kiểm tra status code
            var okResult = result as OkObjectResult;
            okResult.StatusCode.Should().Be(200);
            
            // Kiểm tra dữ liệu trả về
            var records = okResult.Value as List<MedicalRecordDTO>;
            records.Should().NotBeNull();
            records.Should().HaveCount(2);
            records[0].ReservationId.Should().Be("1");
            records[1].ReservationId.Should().Be("2");
            
            // Kiểm tra phương thức service đã được gọi đúng một lần
            _mockMedicalRecordService.Verify(
                service => service.GetAllMedicalRecordByPatientId(patientId),
                Times.Once
            );
            
            // Verify log message
            _mockLogger.Verify(
                x => x.Log(
                    LogLevel.Information,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("SUCCESS")),
                    It.IsAny<Exception>(),
                    It.IsAny<Func<It.IsAnyType, Exception, string>>()),
                Times.Once);
        }

        [Test]
        public async Task GetAllMedicalRecordByPatientId_WhenPatientHasNoRecords_ReturnsOkResultWithEmptyList()
        {
            // Arrange
            int patientId = 2;
            var emptyRecords = new List<MedicalRecordDTO>();

            _mockMedicalRecordService
                .Setup(service => service.GetAllMedicalRecordByPatientId(patientId))
                .ReturnsAsync(emptyRecords);

            // Act
            var result = await _controller.GetAllMedicalRecordByPatientId(patientId);

            // Assert
            // Kiểm tra kiểu trả về
            result.Should().BeOfType<OkObjectResult>();
            
            // Kiểm tra status code
            var okResult = result as OkObjectResult;
            okResult.StatusCode.Should().Be(200);
            
            // Kiểm tra dữ liệu trả về là danh sách rỗng
            var records = okResult.Value as List<MedicalRecordDTO>;
            records.Should().NotBeNull();
            records.Should().BeEmpty();
            
            // Kiểm tra phương thức service đã được gọi đúng một lần
            _mockMedicalRecordService.Verify(
                service => service.GetAllMedicalRecordByPatientId(patientId),
                Times.Once
            );
            
            // Verify log message
            _mockLogger.Verify(
                x => x.Log(
                    LogLevel.Information,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("SUCCESS")),
                    It.IsAny<Exception>(),
                    It.IsAny<Func<It.IsAnyType, Exception, string>>()),
                Times.Once);
        }

        [Test]
        public async Task GetAllMedicalRecordByPatientId_WhenNullIsReturned_ReturnsNotFound()
        {
            // Arrange
            int patientId = 3;
            List<MedicalRecordDTO> nullRecords = null;

            _mockMedicalRecordService
                .Setup(service => service.GetAllMedicalRecordByPatientId(patientId))
                .ReturnsAsync(nullRecords);

            // Act
            var result = await _controller.GetAllMedicalRecordByPatientId(patientId);

            // Assert
            // Kiểm tra kiểu trả về
            result.Should().BeOfType<NotFoundObjectResult>();
            
            // Kiểm tra status code
            var notFoundResult = result as NotFoundObjectResult;
            notFoundResult.StatusCode.Should().Be(404);
            
            // Kiểm tra thông báo lỗi
            notFoundResult.Value.Should().Be($"Bệnh nhân với ID={patientId} không có hồ sơ bệnh án nào cả!");
            
            // Kiểm tra phương thức service đã được gọi đúng một lần
            _mockMedicalRecordService.Verify(
                service => service.GetAllMedicalRecordByPatientId(patientId),
                Times.Once
            );
            
            // Verify log message
            _mockLogger.Verify(
                x => x.Log(
                    LogLevel.Warning,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("FAIL")),
                    It.IsAny<Exception>(),
                    It.IsAny<Func<It.IsAnyType, Exception, string>>()),
                Times.Once);
        }

        [Test]
        public async Task GetAllMedicalRecordByPatientId_WhenExceptionThrown_Returns500Error()
        {
            // Arrange
            int patientId = 4;
            string errorMessage = "Database connection error";

            _mockMedicalRecordService
                .Setup(service => service.GetAllMedicalRecordByPatientId(patientId))
                .ThrowsAsync(new Exception(errorMessage));

            // Act
            var result = await _controller.GetAllMedicalRecordByPatientId(patientId);
            
            // Assert
            // Kiểm tra kiểu trả về
            result.Should().BeOfType<ObjectResult>();
            
            // Kiểm tra status code là 500
            var statusCodeResult = result as ObjectResult;
            statusCodeResult.StatusCode.Should().Be(500);
            
            // Kiểm tra thông báo lỗi
            statusCodeResult.Value.Should().Be("Đã xảy ra lỗi trong quá trình xử lý!");
            
            // Kiểm tra phương thức service đã được gọi đúng một lần
            _mockMedicalRecordService.Verify(
                service => service.GetAllMedicalRecordByPatientId(patientId),
                Times.Once
            );
            
            // Verify log message
            _mockLogger.Verify(
                x => x.Log(
                    LogLevel.Error,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("ERROR")),
                    It.IsAny<Exception>(),
                    It.IsAny<Func<It.IsAnyType, Exception, string>>()),
                Times.Once);
        }
    }
} 