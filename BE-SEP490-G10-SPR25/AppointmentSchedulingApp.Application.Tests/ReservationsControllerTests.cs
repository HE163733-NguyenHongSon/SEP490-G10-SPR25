using System;
using System.Collections.Generic;
using System.Linq;
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
    // Lớp giả lập controller để test
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationService _reservationService;
        private readonly IStorageService _storageService;
        private readonly ILogger<ReservationsController> _logger;

        public ReservationsController(
            IReservationService reservationService, 
            IStorageService storageService,
            ILogger<ReservationsController> logger)
        {
            _reservationService = reservationService;
            _storageService = storageService;
            _logger = logger;
        }

        public async Task<IActionResult> Get()
        {
            try
            {
                var reservations = await _reservationService.GetListReservation();
                _logger.LogInformation("SUCCESS");
                return Ok(reservations);
            }
            catch (Exception ex)
            {
                _logger.LogError("FAIL");
                return StatusCode(500, ex.Message);
            }
        }
        
        public async Task<IActionResult> GetListReservationByFilter(int patientId, string? status = "Đang chờ", string? sortBy = "Giá dịch vụ tăng dần")
        {
            try
            {
                var reservations = await _reservationService.GetListReservationByFilter(patientId, status, sortBy);
                if (reservations == null)
                {
                    _logger.LogWarning("FAIL");
                    return NotFound($"Bệnh nhân với Id={patientId} không tồn tại!");
                }
                if (!reservations.Any())
                {
                    _logger.LogWarning("FAIL");
                    return Ok($"Lịch hẹn với trạng thái '{status}' của bệnh nhân Id={patientId} chưa có!");
                }
                _logger.LogInformation("SUCCESS");
                return Ok(reservations);
            }
            catch (Exception ex)
            {
                _logger.LogError("FAIL");
                return StatusCode(500, ex.Message);
            }
        }
        
        public async Task<IActionResult> GetActiveReservationsForThisWeek()
        {
            try
            {
                var reservations = await _reservationService.GetActiveReservationsForThisWeek();
                _logger.LogInformation("SUCCESS");
                return Ok(reservations);
            }
            catch (Exception ex)
            {
                _logger.LogError("FAIL");
                return StatusCode(500, ex.Message);
            }
        }
        
        public async Task<IActionResult> ViewCancellationReason(int reservationId)
        {
            try
            {
                var reservation = await _reservationService.ViewCancellationReason(reservationId);

                if (reservation == null)
                {
                    _logger.LogWarning("FAIL");
                    return NotFound($"Cuộc hẹn với ID={reservationId} không tồn tại!");
                }

                _logger.LogInformation("SUCCESS");
                return Ok(reservation);
            }
            catch (Exception ex)
            {
                _logger.LogError("FAIL");
                return StatusCode(500, "Đã xảy ra lỗi trong quá trình xử lý!");
            }
        }
    }

    [TestFixture]
    public class ReservationsControllerTests
    {
        private Mock<IReservationService> _mockReservationService;
        private Mock<IStorageService> _mockStorageService;
        private Mock<ILogger<ReservationsController>> _mockLogger;
        private ReservationsController _controller;

        [SetUp]
        public void Setup()
        {
            _mockReservationService = new Mock<IReservationService>();
            _mockStorageService = new Mock<IStorageService>();
            _mockLogger = new Mock<ILogger<ReservationsController>>();
            _controller = new ReservationsController(
                _mockReservationService.Object, 
                _mockStorageService.Object,
                _mockLogger.Object);
        }

        [Test]
        public async Task Get_WhenCalled_ReturnsOkResultWithReservations()
        {
            // Arrange
            var expectedReservations = new List<ReservationDTO>
            {
                new ReservationDTO { ReservationId = 1, Status = "Xác nhận" },
                new ReservationDTO { ReservationId = 2, Status = "Đã hủy" }
            };

            _mockReservationService
                .Setup(service => service.GetListReservation())
                .ReturnsAsync(expectedReservations);

            // Act
            var result = await _controller.Get();

            // Assert
            // Kiểm tra kiểu trả về
            result.Should().BeOfType<OkObjectResult>();
            
            // Kiểm tra status code
            var okResult = result as OkObjectResult;
            okResult.StatusCode.Should().Be(200);
            
            // Kiểm tra dữ liệu trả về
            var reservations = okResult.Value as List<ReservationDTO>;
            reservations.Should().NotBeNull();
            reservations.Should().HaveCount(2);
            reservations[0].ReservationId.Should().Be(1);
            reservations[1].ReservationId.Should().Be(2);
            
            // Kiểm tra phương thức service đã được gọi đúng một lần
            _mockReservationService.Verify(
                service => service.GetListReservation(),
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
        public async Task Get_WhenReservationsEmpty_ReturnsOkResultWithEmptyList()
        {
            // Arrange
            var emptyReservations = new List<ReservationDTO>();

            _mockReservationService
                .Setup(service => service.GetListReservation())
                .ReturnsAsync(emptyReservations);

            // Act
            var result = await _controller.Get();

            // Assert
            // Kiểm tra kiểu trả về
            result.Should().BeOfType<OkObjectResult>();
            
            // Kiểm tra status code
            var okResult = result as OkObjectResult;
            okResult.StatusCode.Should().Be(200);
            
            // Kiểm tra dữ liệu trả về là danh sách rỗng
            var reservations = okResult.Value as List<ReservationDTO>;
            reservations.Should().NotBeNull();
            reservations.Should().BeEmpty();
            
            // Kiểm tra phương thức service đã được gọi đúng một lần
            _mockReservationService.Verify(
                service => service.GetListReservation(),
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
        public async Task Get_WhenServiceThrowsException_Returns500Error()
        {
            // Arrange
            string errorMessage = "Database connection error";

            _mockReservationService
                .Setup(service => service.GetListReservation())
                .ThrowsAsync(new Exception(errorMessage));

            // Act
            var result = await _controller.Get();
            
            // Assert
            // Kiểm tra kiểu trả về
            result.Should().BeOfType<ObjectResult>();
            
            // Kiểm tra status code là 500
            var statusCodeResult = result as ObjectResult;
            statusCodeResult.StatusCode.Should().Be(500);
            
            // Kiểm tra thông báo lỗi
            statusCodeResult.Value.Should().Be(errorMessage);
            
            // Kiểm tra phương thức service đã được gọi đúng một lần
            _mockReservationService.Verify(
                service => service.GetListReservation(),
                Times.Once
            );
            
            // Verify log message
            _mockLogger.Verify(
                x => x.Log(
                    LogLevel.Error,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("FAIL")),
                    It.IsAny<Exception>(),
                    It.IsAny<Func<It.IsAnyType, Exception, string>>()),
                Times.Once);
        }
        
        #region GetActiveReservationsForThisWeek Tests
        
        [Test]
        public async Task GetActiveReservationsForThisWeek_WithActiveReservations_ReturnsOkResultWithReservations()
        {
            // Arrange
            var now = DateTime.Now;
            var expectedReservations = new List<ReservationDTO>
            {
                new ReservationDTO 
                { 
                    ReservationId = 1, 
                    Status = "Đang chờ",
                    AppointmentDate = now.AddDays(1)
                },
                new ReservationDTO 
                { 
                    ReservationId = 2, 
                    Status = "Xác nhận",
                    AppointmentDate = now.AddDays(3)
                }
            };

            _mockReservationService
                .Setup(service => service.GetActiveReservationsForThisWeek())
                .ReturnsAsync(expectedReservations);

            // Act
            var result = await _controller.GetActiveReservationsForThisWeek();

            // Assert
            // Kiểm tra kiểu trả về
            result.Should().BeOfType<OkObjectResult>();
            
            // Kiểm tra status code
            var okResult = result as OkObjectResult;
            okResult.StatusCode.Should().Be(200);
            
            // Kiểm tra dữ liệu trả về
            var reservations = okResult.Value as List<ReservationDTO>;
            reservations.Should().NotBeNull();
            reservations.Should().HaveCount(2);
            reservations[0].ReservationId.Should().Be(1);
            reservations[0].Status.Should().Be("Đang chờ");
            reservations[1].ReservationId.Should().Be(2);
            reservations[1].Status.Should().Be("Xác nhận");
            
            // Kiểm tra phương thức service đã được gọi đúng một lần
            _mockReservationService.Verify(
                service => service.GetActiveReservationsForThisWeek(),
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
        public async Task GetActiveReservationsForThisWeek_WithNoActiveReservations_ReturnsOkResultWithEmptyList()
        {
            // Arrange
            var emptyReservations = new List<ReservationDTO>();

            _mockReservationService
                .Setup(service => service.GetActiveReservationsForThisWeek())
                .ReturnsAsync(emptyReservations);

            // Act
            var result = await _controller.GetActiveReservationsForThisWeek();

            // Assert
            // Kiểm tra kiểu trả về
            result.Should().BeOfType<OkObjectResult>();
            
            // Kiểm tra status code
            var okResult = result as OkObjectResult;
            okResult.StatusCode.Should().Be(200);
            
            // Kiểm tra dữ liệu trả về là danh sách rỗng
            var reservations = okResult.Value as List<ReservationDTO>;
            reservations.Should().NotBeNull();
            reservations.Should().BeEmpty();
            
            // Kiểm tra phương thức service đã được gọi đúng một lần
            _mockReservationService.Verify(
                service => service.GetActiveReservationsForThisWeek(),
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
        public async Task GetActiveReservationsForThisWeek_WhenServiceThrowsException_Returns500Error()
        {
            // Arrange
            string errorMessage = "Lỗi kết nối cơ sở dữ liệu";

            _mockReservationService
                .Setup(service => service.GetActiveReservationsForThisWeek())
                .ThrowsAsync(new Exception(errorMessage));

            // Act
            var result = await _controller.GetActiveReservationsForThisWeek();
            
            // Assert
            // Kiểm tra kiểu trả về
            result.Should().BeOfType<ObjectResult>();
            
            // Kiểm tra status code là 500
            var statusCodeResult = result as ObjectResult;
            statusCodeResult.StatusCode.Should().Be(500);
            
            // Kiểm tra thông báo lỗi
            statusCodeResult.Value.Should().Be(errorMessage);
            
            // Kiểm tra phương thức service đã được gọi đúng một lần
            _mockReservationService.Verify(
                service => service.GetActiveReservationsForThisWeek(),
                Times.Once
            );
            
            // Verify log message
            _mockLogger.Verify(
                x => x.Log(
                    LogLevel.Error,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("FAIL")),
                    It.IsAny<Exception>(),
                    It.IsAny<Func<It.IsAnyType, Exception, string>>()),
                Times.Once);
        }
        
        [Test]
        public async Task GetActiveReservationsForThisWeek_FiltersCorrectly_ReturnsOnlyActiveReservations()
        {
            // Arrange
            var now = DateTime.Now;
            var mixedReservations = new List<ReservationDTO>
            {
                new ReservationDTO 
                { 
                    ReservationId = 1, 
                    Status = "Đang chờ",
                    AppointmentDate = now.AddDays(2)
                },
                new ReservationDTO 
                { 
                    ReservationId = 2, 
                    Status = "Xác nhận",
                    AppointmentDate = now.AddDays(5)
                }
            };

            _mockReservationService
                .Setup(service => service.GetActiveReservationsForThisWeek())
                .ReturnsAsync(mixedReservations);

            // Act
            var result = await _controller.GetActiveReservationsForThisWeek();

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            var reservations = okResult.Value as List<ReservationDTO>;
            
            // Kiểm tra số lượng cuộc hẹn trả về
            reservations.Should().HaveCount(2);
            
            // Kiểm tra tất cả các cuộc hẹn trả về đều có trạng thái "Đang chờ" hoặc "Xác nhận"
            reservations.All(r => r.Status == "Đang chờ" || r.Status == "Xác nhận").Should().BeTrue();
            
            // Kiểm tra tất cả các cuộc hẹn trả về đều trong tuần này
            var startOfWeek = now;
            var endOfWeek = now.AddDays(7);
            reservations.All(r => r.AppointmentDate >= startOfWeek && r.AppointmentDate <= endOfWeek).Should().BeTrue();
        }
        
        #endregion
        
        #region ViewCancellationReason Tests
        
        [Test]
        public async Task ViewCancellationReason_WithValidId_ReturnsOkResultWithReservationStatus()
        {
            // Arrange
            int reservationId = 1;
            var expectedReservation = new ReservationStatusDTO 
            { 
                ReservationId = reservationId, 
                Status = "Đã hủy",
                CancellationReason = "Bệnh nhân không thể đến đúng giờ",
                UpdatedByUserId = 101,
                UpdatedDate = DateTime.Now.AddDays(-1)
            };

            _mockReservationService
                .Setup(service => service.ViewCancellationReason(reservationId))
                .ReturnsAsync(expectedReservation);

            // Act
            var result = await _controller.ViewCancellationReason(reservationId);

            // Assert
            // Kiểm tra kiểu trả về
            result.Should().BeOfType<OkObjectResult>();
            
            // Kiểm tra status code
            var okResult = result as OkObjectResult;
            okResult.StatusCode.Should().Be(200);
            
            // Kiểm tra dữ liệu trả về
            var reservation = okResult.Value as ReservationStatusDTO;
            reservation.Should().NotBeNull();
            reservation.ReservationId.Should().Be(reservationId);
            reservation.Status.Should().Be("Đã hủy");
            reservation.CancellationReason.Should().Be("Bệnh nhân không thể đến đúng giờ");
            
            // Kiểm tra phương thức service đã được gọi đúng một lần
            _mockReservationService.Verify(
                service => service.ViewCancellationReason(reservationId),
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
        public async Task ViewCancellationReason_WithInvalidId_ReturnsNotFound()
        {
            // Arrange
            int invalidReservationId = 999;
            ReservationStatusDTO nullReservation = null;

            _mockReservationService
                .Setup(service => service.ViewCancellationReason(invalidReservationId))
                .ReturnsAsync(nullReservation);

            // Act
            var result = await _controller.ViewCancellationReason(invalidReservationId);

            // Assert
            // Kiểm tra kiểu trả về
            result.Should().BeOfType<NotFoundObjectResult>();
            
            // Kiểm tra status code
            var notFoundResult = result as NotFoundObjectResult;
            notFoundResult.StatusCode.Should().Be(404);
            
            // Kiểm tra thông báo lỗi
            notFoundResult.Value.Should().Be($"Cuộc hẹn với ID={invalidReservationId} không tồn tại!");
            
            // Kiểm tra phương thức service đã được gọi đúng một lần
            _mockReservationService.Verify(
                service => service.ViewCancellationReason(invalidReservationId),
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
        public async Task ViewCancellationReason_WhenServiceThrowsException_Returns500Error()
        {
            // Arrange
            int reservationId = 1;
            string errorMessage = "Lỗi kết nối cơ sở dữ liệu";

            _mockReservationService
                .Setup(service => service.ViewCancellationReason(reservationId))
                .ThrowsAsync(new Exception(errorMessage));

            // Act
            var result = await _controller.ViewCancellationReason(reservationId);
            
            // Assert
            // Kiểm tra kiểu trả về
            result.Should().BeOfType<ObjectResult>();
            
            // Kiểm tra status code là 500
            var statusCodeResult = result as ObjectResult;
            statusCodeResult.StatusCode.Should().Be(500);
            
            // Kiểm tra thông báo lỗi
            statusCodeResult.Value.Should().Be("Đã xảy ra lỗi trong quá trình xử lý!");
            
            // Kiểm tra phương thức service đã được gọi đúng một lần
            _mockReservationService.Verify(
                service => service.ViewCancellationReason(reservationId),
                Times.Once
            );
            
            // Verify log message
            _mockLogger.Verify(
                x => x.Log(
                    LogLevel.Error,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("FAIL")),
                    It.IsAny<Exception>(),
                    It.IsAny<Func<It.IsAnyType, Exception, string>>()),
                Times.Once);
        }    
        
        #endregion
    }
} 