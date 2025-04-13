using System;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Infrastructure.Database;
using AppointmentSchedulingApp.Infrastructure.Repositories;
using AppointmentSchedulingApp.Infrastructure.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace AppointmentSchedulingApp.Application.Tests.UnitOfWork
{
    [TestFixture]
    public class UnitOfWorkTests
    {
        private AppointmentSchedulingDbContext _dbContext;
        private Infrastructure.UnitOfWork.UnitOfWork _unitOfWork;

        [SetUp]
        public void Setup()
        {
            // Setup in-memory database for testing
            var options = new DbContextOptionsBuilder<AppointmentSchedulingDbContext>()
                .UseInMemoryDatabase(databaseName: $"AppointmentSchedulingTestDb_{Guid.NewGuid()}")
                .Options;

            _dbContext = new AppointmentSchedulingDbContext(options);
            _unitOfWork = new Infrastructure.UnitOfWork.UnitOfWork(_dbContext);
        }

        [TearDown]
        public void TearDown()
        {
            _dbContext.Database.EnsureDeleted();
            _dbContext.Dispose();
        }

        [Test]
        public void UnitOfWork_ShouldInitializeRepositories()
        {
            // Act & Assert
            Assert.IsNotNull(_unitOfWork.DoctorRepository);
            Assert.IsInstanceOf<DoctorRepository>(_unitOfWork.DoctorRepository);

            Assert.IsNotNull(_unitOfWork.PatientRepository);
            Assert.IsInstanceOf<PatientRepository>(_unitOfWork.PatientRepository);

            Assert.IsNotNull(_unitOfWork.ServiceRepository);
            Assert.IsInstanceOf<ServiceRepository>(_unitOfWork.ServiceRepository);

            Assert.IsNotNull(_unitOfWork.SpecialtyRepository);
            Assert.IsInstanceOf<SpecialtyRepository>(_unitOfWork.SpecialtyRepository);

            Assert.IsNotNull(_unitOfWork.ReservationRepository);
            Assert.IsInstanceOf<ReservationRepository>(_unitOfWork.ReservationRepository);

            Assert.IsNotNull(_unitOfWork.MedicalRecordRepository);
            Assert.IsInstanceOf<MedicalRecordRepository>(_unitOfWork.MedicalRecordRepository);

            Assert.IsNotNull(_unitOfWork.UserRepository);
            Assert.IsInstanceOf<UserRepository>(_unitOfWork.UserRepository);

            Assert.IsNotNull(_unitOfWork.FeedbackRepository);
            Assert.IsInstanceOf<FeedbackRepository>(_unitOfWork.FeedbackRepository);
        }

        [Test]
        public async Task CommitAsync_ShouldSaveChanges()
        {
            // Arrange
            // First add a user for the patient relationship
            var user = new User
            {
                UserId = 1,
                UserName = "testuser",
                Password = "password123",
                Phone = "1234567890"
            };
            _dbContext.Users.Add(user);
            
            var initialPatientCount = (await _unitOfWork.PatientRepository.GetAll()).Count();
            
            // Add a test entity to the database
            _dbContext.Patients.Add(new Patient
            {
                PatientId = 1,
                MainCondition = "Test Condition",
                Rank = "Regular"
            });

            // Act
            await _unitOfWork.CommitAsync();
            var newPatientCount = (await _unitOfWork.PatientRepository.GetAll()).Count();

            // Assert
            Assert.AreEqual(initialPatientCount + 1, newPatientCount);
        }

        [Test]
        public async Task RollbackAsync_ShouldDiscardChanges()
        {
            // Arrange
            var initialPatientCount = (await _unitOfWork.PatientRepository.GetAll()).Count();
            
            // Add a test entity to the database
            _dbContext.Patients.Add(new Patient
            {
                PatientId = 2,
                MainCondition = "Another Condition",
                Rank = "VIP"
            });

            // Act
            await _unitOfWork.RollbackAsync();
            
            // Create new context and unit of work to ensure we're not using cached data
            var options = new DbContextOptionsBuilder<AppointmentSchedulingDbContext>()
                .UseInMemoryDatabase(databaseName: $"AppointmentSchedulingTestDb_{Guid.NewGuid()}")
                .Options;
            
            using var newContext = new AppointmentSchedulingDbContext(options);
            var newUnitOfWork = new Infrastructure.UnitOfWork.UnitOfWork(newContext);
            var newPatientCount = (await newUnitOfWork.PatientRepository.GetAll()).Count();

            // Assert
            Assert.AreEqual(initialPatientCount, newPatientCount);
        }
    }
} 