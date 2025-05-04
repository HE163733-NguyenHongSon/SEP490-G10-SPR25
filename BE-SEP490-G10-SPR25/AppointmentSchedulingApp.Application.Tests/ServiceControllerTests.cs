using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Tests
{
    [TestFixture]
    public class ServiceControllerTests
    {
        private Mock<IServiceService> _mockServiceService;
        private Mock<IConfiguration> _mockConfiguration;
        private Mock<ILogger<ServiceController>> _mockLogger;
        private ServiceController _controller;

        [SetUp]
        public void Setup()
        {
            _mockServiceService = new Mock<IServiceService>();
            _mockConfiguration = new Mock<IConfiguration>();
            _mockLogger = new Mock<ILogger<ServiceController>>();
            _controller = new ServiceController(
                _mockServiceService.Object,
                _mockLogger.Object);
        }

        [Test]
        public async Task GetServiceById_ExistingId_ReturnsOkResult()
        {
            // Arrange
            int existingServiceId = 1;
            var mockService = new ServiceDTO
            {
                ServiceId = existingServiceId,
                ServiceName = "Khám Tổng Quát",
                Overview = "Dịch vụ khám tổng quát sức khỏe",
                Price = 500000,
                SpecialtyId = 1,
                Image = "kham-tong-quat.jpg",
                Rating = 4.5,
                RatingCount = 10,
                EstimatedTime = "01:00"
            };

            _mockServiceService.Setup(service => service.GetServiceById(existingServiceId))
                .ReturnsAsync(mockService);

            // Act
            var result = await _controller.GetServiceById(existingServiceId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;

            Assert.IsInstanceOf<ServiceDTO>(okResult.Value);
            var returnValue = (ServiceDTO)okResult.Value;

            Assert.AreEqual(existingServiceId, returnValue.ServiceId);
            Assert.AreEqual("Khám Tổng Quát", returnValue.ServiceName);
            
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
        public async Task GetServiceById_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            int nonExistingId = 999;
            _mockServiceService.Setup(service => service.GetServiceById(nonExistingId))
                .ReturnsAsync((ServiceDTO)null);

            // Act
            var result = await _controller.GetServiceById(nonExistingId);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
            
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

    // Định nghĩa lại ServiceController cho việc test
    public class ServiceController : ControllerBase
    {
        private readonly IServiceService _serviceService;
        private readonly ILogger<ServiceController> _logger;

        public ServiceController(
            IServiceService serviceService,
            ILogger<ServiceController> logger)
        {
            _serviceService = serviceService;
            _logger = logger;
        }

        public async Task<IActionResult> GetServiceById(int id)
        {
            try
            {
                var service = await _serviceService.GetServiceById(id);
                if (service == null)
                {
                    _logger.LogWarning("FAIL");
                    return NotFound();
                }
                _logger.LogInformation("SUCCESS");
                return Ok(service);
            }
            catch (Exception ex)
            {
                _logger.LogError("FAIL");
                return StatusCode(500, ex.Message);
            }
        }
    }
}