using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.Exceptions;
using AppointmentSchedulingApp.Application.Services;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AutoMapper;
using Moq;
using NUnit.Framework;

namespace AppointmentSchedulingApp.Application.Tests.Services
{
    /// Author: HE161511-DinhQuangTung
    /// Date : 05/04/2025
    /// <summary>
    /// Unit test cho lớp ServiceService.
    /// Lớp này kiểm tra tất cả các phương thức của ServiceService để đảm bảo chúng hoạt động chính xác.
    /// 
    /// Cách chạy test:
    /// 1. Mở Test Explorer trong Visual Studio
    /// 2.Mở Test Explorer trong Visual Studio bằng cách chọn Test-> Test Explorer hoặc nhấn tổ hợp phím Ctrl+E, T
    /// 3. Chạy tất cả các test hoặc chọn test cụ thể để chạy
    /// 4. Hoặc sử dụng dòng lệnh: dotnet test
    /// 
    /// Các test này sử dụng Moq để tạo các đối tượng giả (UnitOfWork, repositories, AutoMapper)
    /// để mỗi phương thức của service có thể được kiểm tra một cách độc lập.
    /// 
    /// </summary>
    [TestFixture]
    public class ServiceServiceTests
    {
        private Mock<IUnitOfWork> _mockUnitOfWork;
        private Mock<IMapper> _mockMapper;
        private Mock<IServiceRepository> _mockServiceRepository;
        private Mock<IReservationRepository> _mockReservationRepository;
        private Mock<IDoctorRepository> _mockDoctorRepository;
        private ServiceService _serviceService;

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Thiết lập môi trường kiểm thử trước mỗi lần chạy test.
        /// Tạo các đối tượng giả cho tất cả các phụ thuộc và cấu hình ServiceService
        /// để sử dụng các đối tượng giả này.
        /// </summary>
        [SetUp]
        public void Setup()
        {
            // Tạo các triển khai giả cho các phụ thuộc
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _mockMapper = new Mock<IMapper>();
            _mockServiceRepository = new Mock<IServiceRepository>();
            _mockReservationRepository = new Mock<IReservationRepository>();
            _mockDoctorRepository = new Mock<IDoctorRepository>();

            // Cấu hình UnitOfWork giả để trả về các repository giả
            _mockUnitOfWork.Setup(u => u.ServiceRepository).Returns(_mockServiceRepository.Object);
            _mockUnitOfWork.Setup(u => u.ReservationRepository).Returns(_mockReservationRepository.Object);
            _mockUnitOfWork.Setup(u => u.DoctorRepository).Returns(_mockDoctorRepository.Object);

            // Tạo service với các phụ thuộc giả
            _serviceService = new ServiceService(_mockMapper.Object, _mockUnitOfWork.Object);
        }

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Kiểm tra rằng GetListService trả về tất cả các dịch vụ.
        /// Test này đảm bảo rằng service lấy chính xác tất cả các dịch vụ
        /// từ repository và chuyển đổi chúng thành DTOs.
        /// </summary>
        [Test]
        public async Task GetListService_ShouldReturnAllServices()
        {
            // Arrange
            var services = new List<Service>
            {
                new Service { ServiceId = 1, ServiceName = "Service 1", Price = 100 },
                new Service { ServiceId = 2, ServiceName = "Service 2", Price = 200 }
            };

            var serviceDTOs = new List<ServiceDTO>
            {
                new ServiceDTO { ServiceId = 1, ServiceName = "Service 1", Price = 100 },
                new ServiceDTO { ServiceId = 2, ServiceName = "Service 2", Price = 200 }
            };

            _mockServiceRepository.Setup(repo => repo.GetAll()).ReturnsAsync(services);
            _mockMapper.Setup(mapper => mapper.Map<List<ServiceDTO>>(services)).Returns(serviceDTOs);

            // Act
            var result = await _serviceService.GetListService();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
            _mockServiceRepository.Verify(repo => repo.GetAll(), Times.Once);
            _mockMapper.Verify(mapper => mapper.Map<List<ServiceDTO>>(services), Times.Once);
        }

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Kiểm tra rằng GetServiceById trả về dịch vụ chính xác khi được cung cấp ID hợp lệ.
        /// Xác minh rằng service lấy chính xác dịch vụ theo ID
        /// từ repository và chuyển đổi nó thành DTO.
        /// </summary>
        [Test]
        public async Task GetServiceById_WithValidId_ShouldReturnService()
        {
            // Arrange
            int serviceId = 1;
            var service = new Service { ServiceId = serviceId, ServiceName = "Test Service" };
            var serviceDTO = new ServiceDTO { ServiceId = serviceId, ServiceName = "Test Service" };

            _mockServiceRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Service, bool>>>()))
                .ReturnsAsync(service);
            _mockMapper.Setup(mapper => mapper.Map<ServiceDTO>(service)).Returns(serviceDTO);

            // Act
            var result = await _serviceService.GetServiceById(serviceId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(serviceId, result.ServiceId);
            Assert.AreEqual("Test Service", result.ServiceName);
            _mockServiceRepository.Verify(repo => repo.Get(It.IsAny<Expression<Func<Service, bool>>>()), Times.Once);
            _mockMapper.Verify(mapper => mapper.Map<ServiceDTO>(service), Times.Once);
        }

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Kiểm tra rằng GetServiceById ném NotFoundException khi được cung cấp ID không hợp lệ.
        /// Xác minh rằng service xử lý đúng các trường hợp khi dịch vụ
        /// với ID đã chỉ định không tồn tại.
        /// </summary>
        /// <summary>
        /// 1.Test gọi đến _serviceService.GetServiceById(999)
        /// 2. Code sẽ phát hiện service == null và ném vào NotFounddException
        /// 3. Test đang kỳ vọng nhận được NotFoundException nhưng thực tế bên ServiceService.cs sử dụng ServiceException 
        /// 4. Do đó, test sẽ nhận được ServiceException
        /// 5. Do đó test Fail vì không nhận đúng Exception vì bên code ServiceService.cs sử dụng ServiceException (là code đóng gói lại các exception)
        /// -> vậy vấn để gây ra lỗi ở đây là không đồng bộ giữa cách viêt Unit Test và cách xử lí code thực tế ở hàm 
        /// 6. Sau khi chỉnh sửa nhận ServiceException thì test chạy ra đúng kết quả khi hàm GetServiceById trả về null khi dữ liệu đầu vào không hợp lệ
        /// </summary>
        [Test]
        public void GetServiceById_WithInvalidId_ShouldThrowNotFoundException()
        {
             // Bước 1: Arrange - Chuẩn bị dữ liệu và điều kiện test
            int invalidId = 999;
             // Cấu hình mock để trả về null khi tìm service với ID không tồn tại
            _mockServiceRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Service, bool>>>()))
                .ReturnsAsync((Service)null);

            // Bước 2: Act & Assert - Thực hiện hành động và kiểm tra kết quả
            // Test kỳ vọng khi gọi GetServiceById với ID không tồn tại, 
            // sẽ nhận được NotFoundException
            var ex = Assert.ThrowsAsync<NotFoundException>(async () => 
                await _serviceService.GetServiceById(invalidId));
            // Kiểm tra thông báo lỗi có đúng format không
            Assert.That(ex.Message, Contains.Substring($"Service with ID {invalidId} not found"));
        }

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Kiểm tra rằng GetServiceDetailById trả về chi tiết dịch vụ chính xác khi được cung cấp ID hợp lệ.
        /// Xác minh rằng service lấy chính xác dịch vụ theo ID
        /// từ repository và chuyển đổi nó thành DTO chi tiết.
        /// </summary>
        [Test]
        public async Task GetServiceDetailById_WithValidId_ShouldReturnServiceDetail()
        {
            // Arrange
            int serviceId = 1;
            var service = new Service { ServiceId = serviceId, ServiceName = "Test Service" };
            var serviceDetailDTO = new ServiceDetailDTO { ServiceId = serviceId, ServiceName = "Test Service" };

            _mockServiceRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Service, bool>>>()))
                .ReturnsAsync(service);
            _mockMapper.Setup(mapper => mapper.Map<ServiceDetailDTO>(service)).Returns(serviceDetailDTO);

            // Act
            var result = await _serviceService.GetServiceDetailById(serviceId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(serviceId, result.ServiceId);
            _mockServiceRepository.Verify(repo => repo.Get(It.IsAny<Expression<Func<Service, bool>>>()), Times.Once);
            _mockMapper.Verify(mapper => mapper.Map<ServiceDetailDTO>(service), Times.Once);
        }

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Kiểm tra rằng GetServiceDetailById ném NotFoundException khi được cung cấp ID không hợp lệ.
        /// Xác minh rằng service xử lý đúng các trường hợp khi dịch vụ
        /// với ID đã chỉ định không tồn tại.
        /// </summary>
        [Test]
        public void GetServiceDetailById_WithInvalidId_ShouldThrowNotFoundException()
        {
            // Arrange
            int invalidId = 999;
            _mockServiceRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Service, bool>>>()))
                .ReturnsAsync((Service)null);

            // Act & Assert
            var ex = Assert.ThrowsAsync<NotFoundException>(async () => 
                await _serviceService.GetServiceDetailById(invalidId));
            
            Assert.That(ex.Message, Contains.Substring($"Service with ID {invalidId} not found"));
        }

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Kiểm tra rằng AddService thêm thành công một dịch vụ hợp lệ.
        /// Xác minh rằng service chuyển đổi chính xác DTO thành entity,
        /// thêm nó vào repository, và commit thay đổi.
        /// </summary>
        [Test]
        public async Task AddService_WithValidData_ShouldAddServiceSuccessfully()
        {
            // Arrange
            var serviceDTO = new ServiceDTO { ServiceName = "New Service", Price = 150 };
            var service = new Service { ServiceName = "New Service", Price = 150 };

            _mockMapper.Setup(mapper => mapper.Map<Service>(serviceDTO)).Returns(service);
            _mockServiceRepository.Setup(repo => repo.Add(service));
            _mockUnitOfWork.Setup(uow => uow.CommitAsync()).Returns(Task.CompletedTask);

            // Act
            await _serviceService.AddService(serviceDTO);

            // Assert
            _mockMapper.Verify(mapper => mapper.Map<Service>(serviceDTO), Times.Once);
            _mockServiceRepository.Verify(repo => repo.Add(service), Times.Once);
            _mockUnitOfWork.Verify(uow => uow.CommitAsync(), Times.Once);
        }

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Kiểm tra rằng AddService ném ValidationException khi được cung cấp dữ liệu null.
        /// Xác minh rằng service từ chối đúng đầu vào không hợp lệ.
        /// </summary>
        [Test]
        public void AddService_WithNullData_ShouldThrowValidationException()
        {
            // Act & Assert
            var ex = Assert.ThrowsAsync<ServiceException>(async () => 
                await _serviceService.AddService(null));
            
            Assert.That(ex.Message, Is.EqualTo("Service data cannot be null"));
        }

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Kiểm tra rằng UpdateService cập nhật thành công một dịch vụ với dữ liệu hợp lệ.
        /// Xác minh rằng service lấy chính xác dịch vụ hiện có,
        /// áp dụng các cập nhật từ DTO, cập nhật repository, và commit thay đổi.
        /// </summary>
        [Test]
        public async Task UpdateService_WithValidData_ShouldUpdateSuccessfully()
        {
            // Arrange
            int serviceId = 1;
            var serviceDTO = new ServiceDTO { ServiceId = serviceId, ServiceName = "Updated Service", Price = 200 };
            var existingService = new Service { ServiceId = serviceId, ServiceName = "Original Service", Price = 150 };

            _mockServiceRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Service, bool>>>()))
                .ReturnsAsync(existingService);
            _mockMapper.Setup(mapper => mapper.Map(serviceDTO, existingService));
            _mockServiceRepository.Setup(repo => repo.Update(existingService));
            _mockUnitOfWork.Setup(uow => uow.CommitAsync()).Returns(Task.CompletedTask);

            // Act
            await _serviceService.UpdateService(serviceDTO);

            // Assert
            _mockServiceRepository.Verify(repo => repo.Get(It.IsAny<Expression<Func<Service, bool>>>()), Times.Once);
            _mockMapper.Verify(mapper => mapper.Map(serviceDTO, existingService), Times.Once);
            _mockServiceRepository.Verify(repo => repo.Update(existingService), Times.Once);
            _mockUnitOfWork.Verify(uow => uow.CommitAsync(), Times.Once);
        }

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Kiểm tra rằng UpdateService ném ValidationException khi được cung cấp dữ liệu null.
        /// Xác minh rằng service từ chối đúng đầu vào không hợp lệ.
        /// </summary>
        [Test]
        public void UpdateService_WithNullData_ShouldThrowValidationException()
        {
            // Act & Assert
            var ex = Assert.ThrowsAsync<ValidationException>(async () => 
                await _serviceService.UpdateService(null));
            
            Assert.That(ex.Message, Is.EqualTo("Service data cannot be null"));
        }

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Kiểm tra rằng UpdateService ném NotFoundException khi được cung cấp ID không hợp lệ.
        /// Xác minh rằng service xử lý đúng các trường hợp khi dịch vụ
        /// với ID đã chỉ định không tồn tại.
        /// </summary>
        [Test]
        public void UpdateService_WithInvalidId_ShouldThrowNotFoundException()
        {
            // Arrange
            int invalidId = 999;
            var serviceDTO = new ServiceDTO { ServiceId = invalidId, ServiceName = "Updated Service" };

            _mockServiceRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Service, bool>>>()))
                .ReturnsAsync((Service)null);

            // Act & Assert
            var ex = Assert.ThrowsAsync<NotFoundException>(async () => 
                await _serviceService.UpdateService(serviceDTO));
            
            Assert.That(ex.Message, Contains.Substring($"Service with ID {invalidId} not found"));
        }

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Kiểm tra rằng DeleteService xóa thành công một dịch vụ khi được cung cấp ID hợp lệ
        /// và không có lịch hẹn hoạt động.
        /// Xác minh rằng service lấy chính xác dịch vụ và dữ liệu liên quan,
        /// xác nhận không có xung đột, và xóa dịch vụ.
        /// </summary>
        [Test]
        public async Task DeleteService_WithValidIdAndNoActiveReservations_ShouldDeleteSuccessfully()
        {
            // Arrange
            int serviceId = 1;
            var service = new Service { ServiceId = serviceId, ServiceName = "Test Service" };
            var reservations = new List<Reservation>();
            var doctors = new List<Doctor>();

            _mockServiceRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Service, bool>>>()))
                .ReturnsAsync(service);
            _mockReservationRepository.Setup(repo => repo.GetAll(It.IsAny<Expression<Func<Reservation, bool>>>()))
                .ReturnsAsync(reservations);
            _mockDoctorRepository.Setup(repo => repo.GetAll())
                .ReturnsAsync(doctors);
            _mockServiceRepository.Setup(repo => repo.Remove(service));
            _mockUnitOfWork.Setup(uow => uow.CommitAsync()).Returns(Task.CompletedTask);

            // Act
            await _serviceService.DeleteService(serviceId);

            // Assert
            _mockServiceRepository.Verify(repo => repo.Get(It.IsAny<Expression<Func<Service, bool>>>()), Times.Once);
            _mockReservationRepository.Verify(repo => repo.GetAll(It.IsAny<Expression<Func<Reservation, bool>>>()), Times.Once);
            _mockDoctorRepository.Verify(repo => repo.GetAll(), Times.Once);
            _mockServiceRepository.Verify(repo => repo.Remove(service), Times.Once);
            _mockUnitOfWork.Verify(uow => uow.CommitAsync(), Times.Once);
        }

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Kiểm tra rằng DeleteService ném NotFoundException khi được cung cấp ID không hợp lệ.
        /// Xác minh rằng service xử lý đúng các trường hợp khi dịch vụ
        /// với ID đã chỉ định không tồn tại.
        /// </summary>
        [Test]
        public void DeleteService_WithInvalidId_ShouldThrowNotFoundException()
        {
            // Arrange
            int invalidId = 999;
            _mockServiceRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Service, bool>>>()))
                .ReturnsAsync((Service)null);

            // Act & Assert
            var ex = Assert.ThrowsAsync<NotFoundException>(async () => 
                await _serviceService.DeleteService(invalidId));
            
            Assert.That(ex.Message, Contains.Substring($"Service with ID {invalidId} not found"));
        }

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Kiểm tra rằng DeleteService ném ValidationException khi có lịch hẹn hoạt động.
        /// Xác minh rằng service ngăn chặn đúng việc xóa các dịch vụ đang được sử dụng.
        /// </summary>
        [Test]
        public void DeleteService_WithActiveReservations_ShouldThrowValidationException()
        {
            // Arrange
            int serviceId = 1;
            var service = new Service { ServiceId = serviceId, ServiceName = "Test Service" };
            var reservations = new List<Reservation> 
            { 
                new Reservation { Status = "Pending" },
                new Reservation { Status = "Confirmed" }
            };

            _mockServiceRepository.Setup(repo => repo.Get(It.IsAny<Expression<Func<Service, bool>>>()))
                .ReturnsAsync(service);
            _mockReservationRepository.Setup(repo => repo.GetAll(It.IsAny<Expression<Func<Reservation, bool>>>()))
                .ReturnsAsync(reservations);

            // Act & Assert
            var ex = Assert.ThrowsAsync<ValidationException>(async () => 
                await _serviceService.DeleteService(serviceId));
            
            Assert.That(ex.Message, Is.EqualTo("Cannot delete service with active reservations"));
        }

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Kiểm tra rằng GetServicesBySpecialty trả về dịch vụ cho một chuyên khoa cụ thể.
        /// Xác minh rằng service lấy chính xác dịch vụ theo ID chuyên khoa
        /// từ repository và chuyển đổi chúng thành DTOs.
        /// </summary>
        [Test]
        public async Task GetServicesBySpecialty_ShouldReturnServicesForSpecialty()
        {
            // Arrange
            int specialtyId = 1;
            var services = new List<Service>
            {
                new Service { ServiceId = 1, ServiceName = "Service 1", SpecialtyId = specialtyId },
                new Service { ServiceId = 2, ServiceName = "Service 2", SpecialtyId = specialtyId }
            };

            var serviceDTOs = new List<ServiceDTO>
            {
                new ServiceDTO { ServiceId = 1, ServiceName = "Service 1", SpecialtyId = specialtyId },
                new ServiceDTO { ServiceId = 2, ServiceName = "Service 2", SpecialtyId = specialtyId }
            };

            var servicesQueryable = services.AsQueryable();
            _mockServiceRepository.Setup(repo => repo.GetServicesBySpecialty(specialtyId))
                .ReturnsAsync(servicesQueryable);
            _mockMapper.Setup(mapper => mapper.Map<List<ServiceDTO>>(It.IsAny<IEnumerable<Service>>()))
                .Returns(serviceDTOs);

            // Act
            var result = await _serviceService.GetServicesBySpecialty(specialtyId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
            _mockServiceRepository.Verify(repo => repo.GetServicesBySpecialty(specialtyId), Times.Once);
            _mockMapper.Verify(mapper => mapper.Map<List<ServiceDTO>>(It.IsAny<IEnumerable<Service>>()), Times.Once);
        }

        /// Author: HE161511-DinhQuangTung
        /// Date : 05/04/2025
        /// <summary>
        /// Kiểm tra rằng GetServicesSortedByRating trả về dịch vụ được sắp xếp theo xếp hạng theo thứ tự giảm dần.
        /// Xác minh rằng service sắp xếp chính xác dịch vụ theo xếp hạng.
        /// </summary>
        [Test]
        public async Task GetServicesSortedByRating_ShouldReturnServicesSortedByRatingDescending()
        {
            // Arrange
            var services = new List<Service>
            {
                new Service { ServiceId = 1, ServiceName = "Service 1" },
                new Service { ServiceId = 2, ServiceName = "Service 2" }
            };

            var serviceDTOs = new List<ServiceDTO>
            {
                new ServiceDTO { ServiceId = 1, ServiceName = "Service 1", Rating = (double)3.5m },
                new ServiceDTO { ServiceId = 2, ServiceName = "Service 2", Rating = (double)4.5m }
            };

            var sortedServiceDTOs = serviceDTOs.OrderByDescending(s => s.Rating).ToList();

            _mockServiceRepository.Setup(repo => repo.GetAll()).ReturnsAsync(services);
            _mockMapper.Setup(mapper => mapper.Map<List<ServiceDTO>>(services)).Returns(serviceDTOs);

            // Act
            var result = await _serviceService.GetServicesSortedByRating();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual(2, result[0].ServiceId); // First should be highest rated
            Assert.AreEqual(1, result[1].ServiceId);
            _mockServiceRepository.Verify(repo => repo.GetAll(), Times.Once);
            _mockMapper.Verify(mapper => mapper.Map<List<ServiceDTO>>(services), Times.Once);
        }
    }
} 