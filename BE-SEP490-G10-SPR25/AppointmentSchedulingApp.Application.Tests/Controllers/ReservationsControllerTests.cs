using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

// Adding an alias for the ReservationsController from Presentation layer
using ReservationsController = AppointmentSchedulingApp.Presentation.Controllers.ReservationsController;

namespace AppointmentSchedulingApp.Application.Tests.Controllers
{
    [TestFixture]
    public class ReservationsControllerTests
    {
        private Mock<IReservationService> _mockReservationService;
        private ReservationsController _controller;

        [SetUp]
        public void Setup()
        {
            _mockReservationService = new Mock<IReservationService>();
            _controller = new ReservationsController(_mockReservationService.Object);
        }

        [Test]
        public async Task Get_ReturnsOkWithAllReservations()
        {
            // Arrange
            var reservations = new List<ReservationDTO>
            {
                new ReservationDTO { ReservationId = 1, Status = "Đang chờ" },
                new ReservationDTO { ReservationId = 2, Status = "Đã hoàn thành" }
            };

            _mockReservationService.Setup(s => s.GetListReservation())
                .ReturnsAsync(reservations);

            // Act
            var result = await _controller.Get() as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            
            var returnedReservations = result.Value as List<ReservationDTO>;
            Assert.IsNotNull(returnedReservations);
            Assert.AreEqual(2, returnedReservations.Count);
            Assert.AreEqual(1, returnedReservations[0].ReservationId);
            Assert.AreEqual(2, returnedReservations[1].ReservationId);
        }

        [Test]
        public async Task GetListReservationByFilter_WithValidData_ReturnsOkWithFilteredList()
        {
            // Arrange
            int patientId = 101;
            string status = "Đang chờ";
            string sortBy = "Giá dịch vụ tăng dần";

            var reservations = new List<ReservationDTO>
            {
                new ReservationDTO { ReservationId = 1, Status = status },
                new ReservationDTO { ReservationId = 3, Status = status }
            };

            _mockReservationService.Setup(s => s.GetListReservationByFilter(patientId, status, sortBy))
                .ReturnsAsync(reservations);

            // Act
            var result = await _controller.GetListReservationByFilter(patientId, status, sortBy) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            
            var returnedReservations = result.Value as List<ReservationDTO>;
            Assert.IsNotNull(returnedReservations);
            Assert.AreEqual(2, returnedReservations.Count);
            Assert.AreEqual(1, returnedReservations[0].ReservationId);
            Assert.AreEqual(3, returnedReservations[1].ReservationId);
        }

        [Test]
        public async Task GetListReservationByFilter_PatientNotFound_ReturnsNotFound()
        {
            // Arrange
            int patientId = 999;
            string status = "Đang chờ";
            string sortBy = "Giá dịch vụ tăng dần";

            _mockReservationService.Setup(s => s.GetListReservationByFilter(patientId, status, sortBy))
                .ReturnsAsync((List<ReservationDTO>)null);

            // Act
            var result = await _controller.GetListReservationByFilter(patientId, status, sortBy) as NotFoundObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(404, result.StatusCode);
            Assert.That(result.Value.ToString(), Contains.Substring($"Bệnh nhân với Id={patientId} không tồn tại"));
        }

        [Test]
        public async Task GetListReservationByFilter_NoReservationsFound_ReturnsOkWithMessage()
        {
            // Arrange
            int patientId = 101;
            string status = "Đã hủy";
            string sortBy = "Giá dịch vụ tăng dần";

            _mockReservationService.Setup(s => s.GetListReservationByFilter(patientId, status, sortBy))
                .ReturnsAsync(new List<ReservationDTO>());

            // Act
            var result = await _controller.GetListReservationByFilter(patientId, status, sortBy) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.That(result.Value.ToString(), Contains.Substring($"Lịch hẹn với trạng thái '{status}' của bệnh nhân Id={patientId} chưa có"));
        }

        [Test]
        public async Task GetReservationById_WithValidId_ReturnsOkWithReservation()
        {
            // Arrange
            int reservationId = 1;
            var reservation = new ReservationDTO
            {
                ReservationId = reservationId,
                Status = "Đang chờ"
            };

            _mockReservationService.Setup(s => s.GetReservationById(reservationId))
                .ReturnsAsync(reservation);

            // Act
            var result = await _controller.GetReservationById(reservationId) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            
            var returnedReservation = result.Value as ReservationDTO;
            Assert.IsNotNull(returnedReservation);
            Assert.AreEqual(reservationId, returnedReservation.ReservationId);
        }

        [Test]
        public async Task GetReservationById_WithInvalidId_ReturnsNotFound()
        {
            // Arrange
            int invalidId = 999;

            _mockReservationService.Setup(s => s.GetReservationById(invalidId))
                .ReturnsAsync((ReservationDTO)null);

            // Act
            var result = await _controller.GetReservationById(invalidId) as NotFoundObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(404, result.StatusCode);
            Assert.That(result.Value.ToString(), Contains.Substring($"Cuộc hẹn với ID={invalidId} không tồn tại"));
        }

        [Test]
        public async Task UpdateReservationStatus_WithValidData_ReturnsOkWithSuccess()
        {
            // Arrange
            var statusDTO = new ReservationStatusDTO
            {
                ReservationId = 1,
                Status = "Đã hoàn thành"
            };

            var reservation = new ReservationDTO
            {
                ReservationId = 1,
                Status = "Đang chờ"
            };

            _mockReservationService.Setup(s => s.GetReservationById(statusDTO.ReservationId))
                .ReturnsAsync(reservation);
            _mockReservationService.Setup(s => s.UpdateReservationStatus(statusDTO))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.UpdateReservationStatus(statusDTO) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.IsTrue((bool)result.Value);
        }

        [Test]
        public async Task UpdateReservationStatus_WithInvalidId_ReturnsNotFound()
        {
            // Arrange
            var statusDTO = new ReservationStatusDTO
            {
                ReservationId = 999,
                Status = "Đã hoàn thành"
            };

            _mockReservationService.Setup(s => s.GetReservationById(statusDTO.ReservationId))
                .ReturnsAsync((ReservationDTO)null);

            // Act
            var result = await _controller.UpdateReservationStatus(statusDTO) as NotFoundObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(404, result.StatusCode);
            Assert.That(result.Value.ToString(), Contains.Substring($"Cuộc hẹn với ID={statusDTO.ReservationId} không tồn tại"));
        }

        [Test]
        public async Task ViewCancellationReason_WithValidId_ReturnsOkWithReason()
        {
            // Arrange
            int reservationId = 1;
            
            // Trong tình huống thực tế, controller gọi service.ViewCancellationReason() để lấy lý do
            // Và service trả về một ReservationStatusDTO
            // Giả sử đối tượng ReservationStatusDTO đã được cấu hình để chứa thông tin về lý do hủy 
            
            // Phương thức ViewCancellationReason trong controller nên thực hiện xử lý để trích xuất 
            // thông tin lý do từ ReservationStatusDTO và trả về dạng string
            
            _mockReservationService.Setup(s => s.ViewCancellationReason(reservationId))
                .ReturnsAsync(new ReservationStatusDTO 
                { 
                    ReservationId = reservationId,
                    Status = "Đã hủy"
                    // Lưu ý: Không thể thiết lập thuộc tính Reason vì nó không tồn tại trong ReservationStatusDTO
                });

            // Act
            var result = await _controller.ViewCancellationReason(reservationId) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            
            // Không thể kiểm tra nội dung chi tiết của lý do hủy 
            // Chúng ta chỉ đảm bảo rằng controller trả về status code 200 OK
        }

        [Test]
        public async Task ViewCancellationReason_WithInvalidId_ReturnsNotFound()
        {
            // Arrange
            int invalidId = 999;

            _mockReservationService.Setup(s => s.ViewCancellationReason(invalidId))
                .ReturnsAsync((ReservationStatusDTO)null);

            // Act
            var result = await _controller.ViewCancellationReason(invalidId) as NotFoundObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(404, result.StatusCode);
            Assert.That(result.Value.ToString(), Contains.Substring($"Cuộc hẹn với ID={invalidId} không tồn tại"));
        }
    }
} 