using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.Services;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AutoMapper;
using Moq;
using NUnit.Framework;

namespace AppointmentSchedulingApp.Application.Tests.Services
{
    [TestFixture]
    public class ReservationServiceTests
    {
        private Mock<IUnitOfWork> _mockUnitOfWork;
        private Mock<IMapper> _mockMapper;
        private Mock<IReservationRepository> _mockReservationRepository;
        private ReservationService _reservationService;

        [SetUp]
        public void Setup()
        {
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _mockMapper = new Mock<IMapper>();
            _mockReservationRepository = new Mock<IReservationRepository>();

            _mockUnitOfWork.Setup(u => u.ReservationRepository).Returns(_mockReservationRepository.Object);

            _reservationService = new ReservationService(_mockMapper.Object, _mockUnitOfWork.Object);
        }

        [Test]
        public async Task GetReservationById_WithValidId_ReturnsReservation()
        {
            // Arrange
            int reservationId = 1;
            var reservation = new Reservation
            {
                ReservationId = reservationId,
                PatientId = 101,
                Status = "Đang chờ",
                CreatedDate = DateTime.Now
            };

            var reservationDTO = new ReservationDTO
            {
                ReservationId = reservationId,
                Status = "Đang chờ"
            };

            _mockReservationRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Reservation, bool>>>()))
                .ReturnsAsync(reservation);
            _mockMapper.Setup(mapper => mapper.Map<ReservationDTO>(reservation))
                .Returns(reservationDTO);

            // Act
            var result = await _reservationService.GetReservationById(reservationId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(reservationId, result.ReservationId);
            _mockReservationRepository.Verify(repo => repo.Get(It.IsAny<Expression<Func<Reservation, bool>>>()), Times.Once);
            _mockMapper.Verify(mapper => mapper.Map<ReservationDTO>(reservation), Times.Once);
        }

        [Test]
        public async Task GetReservationById_WithInvalidId_ReturnsNull()
        {
            // Arrange
            int invalidId = 999;

            _mockReservationRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Reservation, bool>>>()))
                .ReturnsAsync((Reservation)null);

            // Act
            var result = await _reservationService.GetReservationById(invalidId);

            // Assert
            Assert.IsNull(result);
            _mockReservationRepository.Verify(repo => repo.Get(It.IsAny<Expression<Func<Reservation, bool>>>()), Times.Once);
        }

        [Test]
        public async Task UpdateReservationStatus_Success_ReturnsTrue()
        {
            // Arrange
            var statusDTO = new ReservationStatusDTO
            {
                ReservationId = 1,
                Status = "Đã hoàn thành"
            };

            var reservation = new Reservation
            {
                ReservationId = 1,
                Status = "Đang chờ"
            };

            _mockReservationRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Reservation, bool>>>()))
                .ReturnsAsync(reservation);
            _mockReservationRepository.Setup(repo => repo.Update(It.IsAny<Reservation>()));
            _mockUnitOfWork.Setup(uow => uow.CommitAsync()).Returns(Task.CompletedTask);

            // Act
            var result = await _reservationService.UpdateReservationStatus(statusDTO);

            // Assert
            Assert.IsTrue(result);
            Assert.AreEqual(statusDTO.Status, reservation.Status);
            _mockReservationRepository.Verify(repo => repo.Get(It.IsAny<Expression<Func<Reservation, bool>>>()), Times.Once);
            _mockReservationRepository.Verify(repo => repo.Update(reservation), Times.Once);
            _mockUnitOfWork.Verify(uow => uow.CommitAsync(), Times.Once);
        }

        [Test]
        public async Task UpdateReservationStatus_WithCancellationReason_SavesReason()
        {
            // Arrange
            string cancellationReason = "Bệnh nhân có việc đột xuất";
            var statusDTO = new ReservationStatusDTO
            {
                ReservationId = 1,
                Status = "Đã hủy"
            };

            var reservation = new Reservation
            {
                ReservationId = 1,
                Status = "Đang chờ",
                Reason = null
            };

            _mockReservationRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Reservation, bool>>>()))
                .ReturnsAsync(reservation);
            _mockReservationRepository.Setup(repo => repo.Update(It.IsAny<Reservation>()));
            _mockUnitOfWork.Setup(uow => uow.CommitAsync()).Returns(Task.CompletedTask);

            reservation.Reason = cancellationReason;

            // Act
            var result = await _reservationService.UpdateReservationStatus(statusDTO);

            // Assert
            Assert.IsTrue(result);
            Assert.AreEqual(statusDTO.Status, reservation.Status);
            Assert.AreEqual(cancellationReason, reservation.Reason);
            _mockReservationRepository.Verify(repo => repo.Get(It.IsAny<Expression<Func<Reservation, bool>>>()), Times.Once);
            _mockReservationRepository.Verify(repo => repo.Update(reservation), Times.Once);
            _mockUnitOfWork.Verify(uow => uow.CommitAsync(), Times.Once);
        }

        [Test]
        public async Task UpdateReservationStatus_ReservationNotFound_ReturnsFalse()
        {
            // Arrange
            var statusDTO = new ReservationStatusDTO
            {
                ReservationId = 999,
                Status = "Đã hoàn thành"
            };

            _mockReservationRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Reservation, bool>>>()))
                .ReturnsAsync((Reservation)null);

            // Act
            var result = await _reservationService.UpdateReservationStatus(statusDTO);

            // Assert
            Assert.IsFalse(result);
            _mockReservationRepository.Verify(repo => repo.Get(It.IsAny<Expression<Func<Reservation, bool>>>()), Times.Once);
            _mockReservationRepository.Verify(repo => repo.Update(It.IsAny<Reservation>()), Times.Never);
            _mockUnitOfWork.Verify(uow => uow.CommitAsync(), Times.Never);
        }

        [Test]
        public async Task GetListReservationByFilter_WithValidData_ReturnsFilteredList()
        {
            // Arrange
            int patientId = 101;
            string status = "Đang chờ";
            string sortBy = "Giá dịch vụ tăng dần";

            var reservations = new List<Reservation>
            {
                new Reservation
                {
                    ReservationId = 1,
                    PatientId = patientId,
                    Status = status
                },
                new Reservation
                {
                    ReservationId = 2,
                    PatientId = patientId,
                    Status = status
                }
            };

            var reservationDTOs = new List<ReservationDTO>
            {
                new ReservationDTO
                {
                    ReservationId = 1,
                    Status = status
                },
                new ReservationDTO
                {
                    ReservationId = 2,
                    Status = status
                }
            };

            _mockReservationRepository.Setup(repo => repo.GetAll())
                .ReturnsAsync(reservations);
            _mockMapper.Setup(mapper => mapper.Map<List<ReservationDTO>>(reservations))
                .Returns(reservationDTOs);

            // Act
            var result = await _reservationService.GetListReservationByFilter(patientId, status, sortBy);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
            _mockReservationRepository.Verify(repo => repo.GetAll(), Times.Once);
            _mockMapper.Verify(mapper => mapper.Map<List<ReservationDTO>>(reservations), Times.Once);
        }

        [Test]
        public async Task ViewCancellationReason_WithValidId_ReturnsReason()
        {
            // Arrange
            int reservationId = 1;
            string reason = "Bệnh nhân có việc đột xuất";

            var reservation = new Reservation
            {
                ReservationId = reservationId,
                Status = "Đã hủy",
                Reason = reason
            };

            _mockReservationRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Reservation, bool>>>()))
                .ReturnsAsync(reservation);

            // Act
            var result = await _reservationService.ViewCancellationReason(reservationId);

            // Assert
            Assert.IsNotNull(result);
            Assert.That(result.Status, Is.EqualTo("Đã hủy"));
            _mockReservationRepository.Verify(repo => repo.Get(It.IsAny<Expression<Func<Reservation, bool>>>()), Times.Once);
        }

        [Test]
        public async Task ViewCancellationReason_ReservationNotFound_ReturnsNull()
        {
            // Arrange
            int invalidId = 999;

            _mockReservationRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Reservation, bool>>>()))
                .ReturnsAsync((Reservation)null);

            // Act
            var result = await _reservationService.ViewCancellationReason(invalidId);

            // Assert
            Assert.IsNull(result);
            _mockReservationRepository.Verify(repo => repo.Get(It.IsAny<Expression<Func<Reservation, bool>>>()), Times.Once);
        }
    }
} 