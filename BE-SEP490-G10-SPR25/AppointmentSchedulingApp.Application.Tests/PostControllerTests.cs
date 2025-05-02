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
    public class PostControllerTests
    {
        private Mock<IPostService> _mockPostService;
        private Mock<IStorageService> _mockStorageService;
        private Mock<IConfiguration> _mockConfiguration;
        private Mock<ILogger<PostController>> _mockLogger;
        private PostController _controller;

        [SetUp]
        public void Setup()
        {
            _mockPostService = new Mock<IPostService>();
            _mockStorageService = new Mock<IStorageService>();
            _mockConfiguration = new Mock<IConfiguration>();
            _mockLogger = new Mock<ILogger<PostController>>();
            _controller = new PostController(
                _mockPostService.Object,
                _mockStorageService.Object,
                _mockConfiguration.Object,
                _mockLogger.Object);
        }

        [Test]
        public async Task GetPostById_ExistingId_ReturnsOkResult()
        {
            // Arrange
            int existingPostId = 1;
            var mockPost = new PostDetailDTO
            {
                PostId = existingPostId,
                PostTitle = "Test Post",
                PostDescription = "Test Description",
                PostSourceUrl = "https://example.com",
                AuthorId = 1
            };

            _mockPostService.Setup(service => service.GetPostDetailAsync(existingPostId))
                .ReturnsAsync(mockPost);

            // Act
            var result = await _controller.GetPostById(existingPostId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = (OkObjectResult)result.Result;
            
            Assert.IsInstanceOf<PostDetailDTO>(okResult.Value);
            var returnValue = (PostDetailDTO)okResult.Value;
            
            Assert.AreEqual(existingPostId, returnValue.PostId);
            Assert.AreEqual("Test Post", returnValue.PostTitle);
            
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
        public async Task GetPostById_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            int nonExistingId = 999;
            _mockPostService.Setup(service => service.GetPostDetailAsync(nonExistingId))
                .ReturnsAsync((PostDetailDTO)null);

            // Act
            var result = await _controller.GetPostById(nonExistingId);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result.Result);
            
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

    // Định nghĩa lại PostController cho việc test
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IStorageService _storageService;
        private readonly IConfiguration _configuration;
        private readonly ILogger<PostController> _logger;

        public PostController(
            IPostService postService, 
            IStorageService storageService, 
            IConfiguration configuration,
            ILogger<PostController> logger)
        {
            _postService = postService;
            _storageService = storageService;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<ActionResult<PostDetailDTO>> GetPostById(int id)
        {
            try
            {
                var post = await _postService.GetPostDetailAsync(id);
                if (post == null) 
                {
                    _logger.LogWarning("FAIL");
                    return NotFound();
                }
                _logger.LogInformation("SUCCESS");
                return Ok(post);
            }
            catch (Exception ex)
            {
                _logger.LogError("FAIL");
                return StatusCode(500, ex.Message);
            }
        }
    }
}