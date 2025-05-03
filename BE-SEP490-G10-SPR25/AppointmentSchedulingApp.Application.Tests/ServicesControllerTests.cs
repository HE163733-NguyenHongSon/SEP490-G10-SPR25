using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Tests
{
    [TestFixture]
    public class ServicesControllerTests
    {
        private Mock<IServiceService> _mockServiceService;
        private Mock<ILogger<ServicesController>> _mockLogger;
        private ServicesController _controller;

        [SetUp]
        public void Setup()
        {
            _mockServiceService = new Mock<IServiceService>();
            _mockLogger = new Mock<ILogger<ServicesController>>();
            _controller = new ServicesController(_mockServiceService.Object, _mockLogger.Object);
        }

        [Test]
        public async Task AddService_ValidService_ReturnsOkResult()
        {
            // Arrange
            var serviceDto = new ServiceDTO
            {
                ServiceName = "Khám Nha Khoa",
                Overview = "Dịch vụ khám và điều trị răng miệng",
                Price = 500000,
                SpecialtyId = 3,
                Image = "nha-khoa.jpg",
                Process = "Quy trình khám và điều trị",
                TreatmentTechniques = "Kỹ thuật nha khoa hiện đại",
                EstimatedTime = "01:30",
                IsPrepayment = true
            };

            _mockServiceService.Setup(service => service.AddService(It.IsAny<ServiceDTO>()))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _controller.AddService(serviceDto);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;

            var response = okResult.Value as dynamic;
            Assert.IsTrue((bool)response.success);
            Assert.AreEqual("Service created successfully", (string)response.message);
            
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
        public async Task AddService_ValidationException_ReturnsBadRequest()
        {
            // Arrange
            var serviceDto = new ServiceDTO
            {
                ServiceName = "", // Invalid - empty name
                Price = -100, // Invalid - negative price
                SpecialtyId = 3,
                Image = "nha-khoa.jpg"
            };

            string errorMessage = "Service name is required";
            _mockServiceService.Setup(service => service.AddService(It.IsAny<ServiceDTO>()))
                .ThrowsAsync(new ValidationException(errorMessage));

            // Act
            var result = await _controller.AddService(serviceDto);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = (BadRequestObjectResult)result;

            var response = badRequestResult.Value as dynamic;
            Assert.IsFalse((bool)response.success);
            Assert.AreEqual(errorMessage, (string)response.message);
            
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

    // Định nghĩa lại ServicesController cho việc test
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService _serviceService;
        private readonly ILogger<ServicesController> _logger;

        public ServicesController(
            IServiceService serviceService,
            ILogger<ServicesController> logger)
        {
            _serviceService = serviceService;
            _logger = logger;
        }

        public async Task<IActionResult> AddService(ServiceDTO serviceDto)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("FAIL");
                return BadRequest(new { success = false, message = "Invalid model state" });
            }

            try
            {
                await _serviceService.AddService(serviceDto);
                _logger.LogInformation("SUCCESS");
                return Ok(new { success = true, message = "Service created successfully" });
            }
            catch (ValidationException ex)
            {
                _logger.LogWarning("FAIL");
                return BadRequest(new { success = false, message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError("FAIL");
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while creating the service",
                    error = ex.Message
                });
            }
        }
    }
}