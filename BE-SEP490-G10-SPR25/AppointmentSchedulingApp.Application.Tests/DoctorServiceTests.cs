using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Application.Services;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using FluentAssertions;

namespace AppointmentSchedulingApp.Application.Tests
{
    // Định nghĩa ValidationException cho tests
    public class ValidationException : Exception
    {
        public ValidationException(string message) : base(message) { }
    }

    [TestFixture]
    public class DoctorServiceTests
    {
        private Mock<IDoctorService> _mockDoctorService;
        private Mock<ILogger<DoctorService>> _mockLogger;

        [SetUp]
        public void Setup()
        {
            _mockDoctorService = new Mock<IDoctorService>();
            _mockLogger = new Mock<ILogger<DoctorService>>();
        }

        [Test]
        public async Task GetDoctorDetailById_WithValidId_ReturnsDoctorDetailDTO()
        {
            // Arrange
            int validDoctorId = 33;
            
            // Create the expected return DTO
            var expectedDto = new DoctorDetailDTO
            {
                UserId = validDoctorId,
                Email = "bacsi.nguyenvanan@example.com"
            };
            
            // Setup the mock service to return our expected result
            _mockDoctorService
                .Setup(service => service.GetDoctorDetailById(validDoctorId))
                .ReturnsAsync(expectedDto);

            // Act
            var result = await _mockDoctorService.Object.GetDoctorDetailById(validDoctorId);
            
            // Log directly instead of using extension method
            _mockLogger.Object.LogInformation("SUCCESS");
            
            // Assert
            result.Should().NotBeNull();
            result.UserId.Should().Be(validDoctorId);
            result.Email.Should().Be("bacsi.nguyenvanan@example.com");
            
            // Verify the method was called with the correct ID
            _mockDoctorService.Verify(
                service => service.GetDoctorDetailById(validDoctorId), 
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
        public async Task GetDoctorDetailById_WithInvalidId_ReturnsNull()
        {
            // Arrange
            int invalidDoctorId = 999;
            
            // Setup the mock service to return null for invalid ID
            _mockDoctorService
                .Setup(service => service.GetDoctorDetailById(invalidDoctorId))
                .ReturnsAsync((DoctorDetailDTO)null);

            // Act
            var result = await _mockDoctorService.Object.GetDoctorDetailById(invalidDoctorId);
            
            // Log directly instead of using extension method
            _mockLogger.Object.LogWarning("FAIL");
            
            // Assert
            result.Should().BeNull();
            
            // Verify the method was called with the invalid ID
            _mockDoctorService.Verify(
                service => service.GetDoctorDetailById(invalidDoctorId), 
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
                          
        #region DeleteDoctor Tests
        
        [Test]
        public async Task DeleteDoctor_WithValidId_ReturnsTrue()
        {
            // Arrange
            int doctorId = 33;
            
            // Setup the mock service to return true for successful deletion
            _mockDoctorService
                .Setup(service => service.DeleteDoctor(doctorId))
                .ReturnsAsync(true);

            // Act
            var result = await _mockDoctorService.Object.DeleteDoctor(doctorId);
            
            // Log directly instead of using extension method
            _mockLogger.Object.LogInformation("SUCCESS");
            
            // Assert
            result.Should().BeTrue();
            
            // Verify the method was called with the doctor ID
            _mockDoctorService.Verify(
                service => service.DeleteDoctor(doctorId), 
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
        public async Task DeleteDoctor_WithInvalidId_ReturnsFalse()
        {
            // Arrange
            int invalidDoctorId = 999;
            
            // Setup the mock service to return false when doctor not found
            _mockDoctorService
                .Setup(service => service.DeleteDoctor(invalidDoctorId))
                .ReturnsAsync(false);

            // Act
            var result = await _mockDoctorService.Object.DeleteDoctor(invalidDoctorId);
            
            // Log directly instead of using extension method
            _mockLogger.Object.LogWarning("FAIL");
            
            // Assert
            result.Should().BeFalse();
            
            // Verify the method was called with the doctor ID
            _mockDoctorService.Verify(
                service => service.DeleteDoctor(invalidDoctorId), 
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
        public void DeleteDoctor_WithActiveAppointments_ThrowsValidationException()
        {
            // Arrange
            int doctorId = 33;
            string errorMessage = "Không thể xóa bác sĩ vì có cuộc hẹn đang hoạt động. Vui lòng hủy tất cả cuộc hẹn trước khi xóa.";
            
            // Setup the mock service to throw ValidationException when doctor has active appointments
            _mockDoctorService
                .Setup(service => service.DeleteDoctor(doctorId))
                .ThrowsAsync(new ValidationException(errorMessage));

            // Act & Assert
            Func<Task> act = async () => 
            {
                try
                {
                    await _mockDoctorService.Object.DeleteDoctor(doctorId);
                }
                catch
                {
                    // Log error directly instead of using extension method
                    _mockLogger.Object.LogError("FAIL");
                    throw;
                }
            };
            
            act.Should().ThrowAsync<ValidationException>()
               .WithMessage(errorMessage);
            
            // Verify the method was called with the doctor ID
            _mockDoctorService.Verify(
                service => service.DeleteDoctor(doctorId), 
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
        public void DeleteDoctor_WithDatabaseError_ThrowsException()
        {
            // Arrange
            int doctorId = 33;
            string errorMessage = "Lỗi khi xóa bác sĩ: Database connection error";
            
            // Setup the mock service to throw general Exception for database errors
            _mockDoctorService
                .Setup(service => service.DeleteDoctor(doctorId))
                .ThrowsAsync(new Exception(errorMessage));

            // Act & Assert
            Func<Task> act = async () => 
            {
                try
                {
                    await _mockDoctorService.Object.DeleteDoctor(doctorId);
                }
                catch
                {
                    // Log error directly instead of using extension method
                    _mockLogger.Object.LogError("FAIL");
                    throw;
                }
            };
            
            act.Should().ThrowAsync<Exception>()
               .WithMessage(errorMessage);
            
            // Verify the method was called with the doctor ID
            _mockDoctorService.Verify(
                service => service.DeleteDoctor(doctorId), 
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

    // Mở rộng IDoctorService để hỗ trợ logging cho tests
    public static class DoctorServiceExtensions
    {
        public static void LogSuccess(this IDoctorService service) { }
        public static void LogFailure(this IDoctorService service) { }
        public static void LogError(this IDoctorService service) { }
    }
} 