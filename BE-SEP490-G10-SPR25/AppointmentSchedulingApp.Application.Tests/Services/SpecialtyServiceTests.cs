using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
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
    public class SpecialtyServiceTests
    {
        private Mock<IUnitOfWork> _mockUnitOfWork;
        private Mock<IMapper> _mockMapper;
        private Mock<ISpecialtyRepository> _mockSpecialtyRepository;
        private SpecialtyService _specialtyService;

        [SetUp]
        public void Setup()
        {
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _mockMapper = new Mock<IMapper>();
            _mockSpecialtyRepository = new Mock<ISpecialtyRepository>();

            _mockUnitOfWork.Setup(u => u.SpecialtyRepository).Returns(_mockSpecialtyRepository.Object);

            _specialtyService = new SpecialtyService(_mockMapper.Object, _mockUnitOfWork.Object);
        }

        [Test]
        public async Task GetSpecialtyList_ShouldReturnAllSpecialties()
        {
            // Arrange
            var specialties = new List<Specialty>
            {
                new Specialty { SpecialtyId = 1, SpecialtyName = "Specialty 1" },
                new Specialty { SpecialtyId = 2, SpecialtyName = "Specialty 2" }
            };

            var specialtyDTOs = new List<SpecialtyDTO>
            {
                new SpecialtyDTO { SpecialtyId = 1, SpecialtyName = "Specialty 1" },
                new SpecialtyDTO { SpecialtyId = 2, SpecialtyName = "Specialty 2" }
            };

            _mockSpecialtyRepository.Setup(repo => repo.GetAll()).ReturnsAsync(specialties);
            _mockMapper.Setup(mapper => mapper.Map<List<SpecialtyDTO>>(specialties)).Returns(specialtyDTOs);

            // Act
            var result = await _specialtyService.GetSpecialtyList();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
            _mockSpecialtyRepository.Verify(repo => repo.GetAll(), Times.Once);
            _mockMapper.Verify(mapper => mapper.Map<List<SpecialtyDTO>>(specialties), Times.Once);
        }

        [Test]
        public async Task GetSpecialtyDetailById_WithValidId_ShouldReturnSpecialtyDetail()
        {
            // Arrange
            int specialtyId = 1;
            var specialty = new Specialty 
            { 
                SpecialtyId = specialtyId, 
                SpecialtyName = "Test Specialty",
                SpecialtyDescription = "Test Description" 
            };
            
            var specialtyDetailDTO = new SpecialtyDetailDTO 
            { 
                SpecialtyId = specialtyId, 
                SpecialtyName = "Test Specialty",
                SpecialtyDescription = "Test Description"
            };

            _mockSpecialtyRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Specialty, bool>>>()))
                .ReturnsAsync(specialty);
            _mockMapper.Setup(mapper => mapper.Map<SpecialtyDetailDTO>(specialty)).Returns(specialtyDetailDTO);

            // Act
            var result = await _specialtyService.GetSpecialtyDetailById(specialtyId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(specialtyId, result.SpecialtyId);
            Assert.AreEqual("Test Specialty", result.SpecialtyName);
            Assert.AreEqual("Test Description", result.SpecialtyDescription);
            _mockSpecialtyRepository.Verify(repo => repo.Get(It.IsAny<Expression<Func<Specialty, bool>>>()), Times.Once);
            _mockMapper.Verify(mapper => mapper.Map<SpecialtyDetailDTO>(specialty), Times.Once);
        }

        [Test]
        public async Task AddSpecialty_WithValidData_ShouldAddSpecialtySuccessfully()
        {
            // Arrange
            var specialtyDTO = new SpecialtyDTO 
            { 
                SpecialtyId = 1, // Will be set to 0 in the service
                SpecialtyName = "New Specialty" 
            };
            
            var specialty = new Specialty 
            { 
                SpecialtyId = 0, 
                SpecialtyName = "New Specialty" 
            };

            _mockMapper.Setup(mapper => mapper.Map<Specialty>(It.IsAny<SpecialtyDTO>())).Returns(specialty);
            _mockSpecialtyRepository.Setup(repo => repo.AddAsync(specialty)).Returns(Task.CompletedTask);
            _mockUnitOfWork.Setup(uow => uow.CommitAsync()).Returns(Task.CompletedTask);

            // Act
            await _specialtyService.AddSpecialty(specialtyDTO);

            // Assert
            _mockMapper.Verify(mapper => mapper.Map<Specialty>(It.IsAny<SpecialtyDTO>()), Times.Once);
            _mockSpecialtyRepository.Verify(repo => repo.AddAsync(specialty), Times.Once);
            _mockUnitOfWork.Verify(uow => uow.CommitAsync(), Times.Once);
            Assert.AreEqual(0, specialtyDTO.SpecialtyId); // Ensure ID was set to 0
        }

        [Test]
        public async Task UpdateSpecialty_WithValidData_ShouldUpdateSuccessfully()
        {
            // Arrange
            int specialtyId = 1;
            var specialtyDTO = new SpecialtyDTO 
            { 
                SpecialtyId = specialtyId, 
                SpecialtyName = "Updated Specialty" 
            };
            
            var existingSpecialty = new Specialty 
            { 
                SpecialtyId = specialtyId, 
                SpecialtyName = "Original Specialty" 
            };

            _mockSpecialtyRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Specialty, bool>>>()))
                .ReturnsAsync(existingSpecialty);
            _mockMapper.Setup(mapper => mapper.Map(specialtyDTO, existingSpecialty));
            _mockSpecialtyRepository.Setup(repo => repo.Update(existingSpecialty));
            _mockUnitOfWork.Setup(uow => uow.CommitAsync()).Returns(Task.CompletedTask);

            // Act
            await _specialtyService.UpdateSpecialty(specialtyDTO);

            // Assert
            _mockSpecialtyRepository.Verify(repo => repo.Get(It.IsAny<Expression<Func<Specialty, bool>>>()), Times.Once);
            _mockMapper.Verify(mapper => mapper.Map(specialtyDTO, existingSpecialty), Times.Once);
            _mockSpecialtyRepository.Verify(repo => repo.Update(existingSpecialty), Times.Once);
            _mockUnitOfWork.Verify(uow => uow.CommitAsync(), Times.Once);
        }

        [Test]
        public void UpdateSpecialty_WithInvalidId_ShouldThrowValidationException()
        {
            // Arrange
            int invalidId = 999;
            var specialtyDTO = new SpecialtyDTO { SpecialtyId = invalidId, SpecialtyName = "Updated Specialty" };

            _mockSpecialtyRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Specialty, bool>>>()))
                .ReturnsAsync((Specialty)null);

            // Act & Assert
            var ex = Assert.ThrowsAsync<ValidationException>(async () => 
                await _specialtyService.UpdateSpecialty(specialtyDTO));
            
            Assert.That(ex.Message, Contains.Substring($"Specialty with ID {invalidId} not found"));
        }

        [Test]
        public async Task DeleteSpecialty_WithValidId_ShouldDeleteSuccessfully()
        {
            // Arrange
            int specialtyId = 1;
            var specialty = new Specialty { SpecialtyId = specialtyId, SpecialtyName = "Test Specialty" };

            _mockSpecialtyRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Specialty, bool>>>()))
                .ReturnsAsync(specialty);
            _mockSpecialtyRepository.Setup(repo => repo.Remove(specialty));
            _mockUnitOfWork.Setup(uow => uow.CommitAsync()).Returns(Task.CompletedTask);

            // Act
            await _specialtyService.DeleteSpecialty(specialtyId);

            // Assert
            _mockSpecialtyRepository.Verify(repo => repo.Get(It.IsAny<Expression<Func<Specialty, bool>>>()), Times.Once);
            _mockSpecialtyRepository.Verify(repo => repo.Remove(specialty), Times.Once);
            _mockUnitOfWork.Verify(uow => uow.CommitAsync(), Times.Once);
        }

        [Test]
        public void DeleteSpecialty_WithInvalidId_ShouldThrowValidationException()
        {
            // Arrange
            int invalidId = 999;
            _mockSpecialtyRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Specialty, bool>>>()))
                .ReturnsAsync((Specialty)null);

            // Act & Assert
            var ex = Assert.ThrowsAsync<ValidationException>(async () => 
                await _specialtyService.DeleteSpecialty(invalidId));
            
            Assert.That(ex.Message, Contains.Substring($"Specialty with ID {invalidId} not found"));
        }
    }
} 