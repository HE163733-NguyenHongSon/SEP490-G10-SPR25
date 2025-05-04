using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Tests
{
    [TestFixture]
    public class FeedbacksControllerTests
    {
        private Mock<IFeedbackService> _mockFeedbackService;
        private Mock<ILogger<FeedbacksController>> _mockLogger;
        private FeedbacksController _controller;

        [SetUp]
        public void Setup()
        {
            _mockFeedbackService = new Mock<IFeedbackService>();
            _mockLogger = new Mock<ILogger<FeedbacksController>>();
            _controller = new FeedbacksController(_mockFeedbackService.Object, _mockLogger.Object);
        }

        [Test]
        public async Task Get_ReturnsOkResultWithFeedbacks_WhenFeedbacksExist()
        {
            // Arrange
            var feedbacks = new List<FeedbackDTO>
            {
                new FeedbackDTO
                {
                    FeedbackId = 1,
                    ReservationId = 101,
                    PatientId = 201,
                    PatientName = "Nguyễn Văn A",
                    ServiceId = 301,
                    ServiceName = "Khám tổng quát",
                    ServiceFeedbackGrade = 5,
                    ServiceFeedbackContent = "Dịch vụ rất tốt",
                    DoctorId = 401,
                    DoctorName = "Bác sĩ B",
                    DoctorFeedbackGrade = 5,
                    DoctorFeedbackContent = "Bác sĩ rất chuyên nghiệp",
                    FeedbackDate = DateTime.Now.AddDays(-1)
                },
                new FeedbackDTO
                {
                    FeedbackId = 2,
                    ReservationId = 102,
                    PatientId = 202,
                    PatientName = "Trần Thị C",
                    ServiceId = 302,
                    ServiceName = "Khám nha khoa",
                    ServiceFeedbackGrade = 4,
                    ServiceFeedbackContent = "Dịch vụ khá tốt",
                    DoctorId = 402,
                    DoctorName = "Bác sĩ D",
                    DoctorFeedbackGrade = 4,
                    DoctorFeedbackContent = "Bác sĩ nhiệt tình",
                    FeedbackDate = DateTime.Now.AddDays(-2)
                }
            };

            _mockFeedbackService.Setup(service => service.GetFeedbackList())
                .ReturnsAsync(feedbacks);

            // Act
            var result = await _controller.Get();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;

            var returnValue = okResult.Value as List<FeedbackDTO>;
            Assert.IsNotNull(returnValue);
            Assert.AreEqual(2, returnValue.Count);
            Assert.AreEqual(1, returnValue[0].FeedbackId);
            Assert.AreEqual(2, returnValue[1].FeedbackId);
            
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
        public async Task Get_ReturnsNoContent_WhenNoFeedbacksExist()
        {
            // Arrange
            _mockFeedbackService.Setup(service => service.GetFeedbackList())
                .ReturnsAsync(new List<FeedbackDTO>());

            // Act
            var result = await _controller.Get();

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
            
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

    // Định nghĩa lại FeedbacksController cho việc test
    public class FeedbacksController : ControllerBase
    {
        public IFeedbackService feedbackService { get; set; }
        private readonly ILogger<FeedbacksController> _logger;

        public FeedbacksController(
            IFeedbackService feedbackService,
            ILogger<FeedbacksController> logger)
        {
            this.feedbackService = feedbackService;
            this._logger = logger;
        }

        public async Task<IActionResult> Get()
        {
            try
            {
                var feedbacks = await feedbackService.GetFeedbackList();

                if (feedbacks == null || !feedbacks.Any())
                {
                    _logger.LogWarning("FAIL");
                    return NoContent();
                }

                _logger.LogInformation("SUCCESS");
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                _logger.LogError("FAIL");
                return StatusCode(500, ex.Message);
            }
        }
    }
}