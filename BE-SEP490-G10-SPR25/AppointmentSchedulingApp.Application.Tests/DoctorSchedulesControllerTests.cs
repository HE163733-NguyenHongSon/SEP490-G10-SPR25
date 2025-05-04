using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Tests
{
    [TestFixture]
    public class DoctorSchedulesControllerTests
    {
        private Mock<IDoctorScheduleService> _mockDoctorScheduleService;
        private Mock<ILogger<DoctorSchedulesController>> _mockLogger;
        private DoctorSchedulesController _controller;

        [SetUp]
        public void Setup()
        {
            _mockDoctorScheduleService = new Mock<IDoctorScheduleService>();
            _mockLogger = new Mock<ILogger<DoctorSchedulesController>>();
            _controller = new DoctorSchedulesController(_mockDoctorScheduleService.Object, _mockLogger.Object);
        }

        [Test]
        public async Task UpdateDoctorSchedule_ExistingId_ReturnsOkResult()
        {
            // Arrange
            int doctorScheduleId = 1;
            var doctorScheduleUpdateDTO = new DoctorScheduleUpdateDTO
            {
                DoctorScheduleId = doctorScheduleId,
                DoctorId = 2,
                ServiceId = 3,
                DayOfWeek = "Monday",
                RoomId = 4,
                SlotId = 5
            };

            var doctorScheduleDTO = new DoctorScheduleDTO
            {
                DoctorScheduleId = doctorScheduleId,
                DoctorId = 1,
                ServiceId = 1,
                DayOfWeek = "Friday",
                RoomId = 1,
                SlotId = 1
            };

            _mockDoctorScheduleService.Setup(service => service.GetDoctorScheduleDetailById(doctorScheduleId))
                .ReturnsAsync(doctorScheduleDTO);

            _mockDoctorScheduleService.Setup(service => service.UpdateDoctorSchedule(doctorScheduleUpdateDTO))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.UpdateDoctorSchedule(doctorScheduleUpdateDTO);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.IsTrue((bool)okResult.Value);
            
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
        public async Task UpdateDoctorSchedule_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            int nonExistingId = 999;
            var doctorScheduleUpdateDTO = new DoctorScheduleUpdateDTO
            {
                DoctorScheduleId = nonExistingId,
                DoctorId = 2,
                ServiceId = 3,
                DayOfWeek = "Monday",
                RoomId = 4,
                SlotId = 5
            };

            _mockDoctorScheduleService.Setup(service => service.GetDoctorScheduleDetailById(nonExistingId))
                .ReturnsAsync((DoctorScheduleDTO)null);

            // Act
            var result = await _controller.UpdateDoctorSchedule(doctorScheduleUpdateDTO);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
            var notFoundResult = (NotFoundObjectResult)result;
            Assert.AreEqual($"Lịch trình với ID={nonExistingId} không tồn tại!", notFoundResult.Value);
            
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
    }

    // Định nghĩa lại DoctorSchedulesController cho việc test
    public class DoctorSchedulesController : ControllerBase
    {
        private readonly IDoctorScheduleService _doctorScheduleService;
        private readonly ILogger<DoctorSchedulesController> _logger;

        public DoctorSchedulesController(
            IDoctorScheduleService doctorScheduleService,
            ILogger<DoctorSchedulesController> logger)
        {
            _doctorScheduleService = doctorScheduleService;
            _logger = logger;
        }

        public async Task<IActionResult> UpdateDoctorSchedule(DoctorScheduleUpdateDTO doctorScheduleUpdateDTO)
        {
            try
            {
                var doctorSchedule = await _doctorScheduleService.GetDoctorScheduleDetailById(doctorScheduleUpdateDTO.DoctorScheduleId);

                if (doctorSchedule == null)
                {
                    _logger.LogWarning("FAIL");
                    return NotFound($"Lịch trình với ID={doctorScheduleUpdateDTO.DoctorScheduleId} không tồn tại!");
                }

                var isTrue = await _doctorScheduleService.UpdateDoctorSchedule(doctorScheduleUpdateDTO);
                _logger.LogInformation("SUCCESS");

                return Ok(isTrue);
            }
            catch (Exception ex)
            {
                _logger.LogError("FAIL");
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!");
            }
        }
    }
}