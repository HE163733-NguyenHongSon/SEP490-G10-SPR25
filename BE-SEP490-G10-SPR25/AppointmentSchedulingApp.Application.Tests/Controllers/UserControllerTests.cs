using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Infrastructure.Helper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

// Adding an alias for the UserController from Presentation layer
using UserController = AppointmentSchedulingApp.Presentation.Controllers.UserController;

namespace AppointmentSchedulingApp.Application.Tests.Controllers
{
    [TestFixture]
    public class UserControllerTests
    {
        private Mock<IUserService> _mockUserService;
        private UserController _controller;

        [SetUp]
        public void Setup()
        {
            _mockUserService = new Mock<IUserService>();
            _controller = new UserController(_mockUserService.Object);
        }

        [Test]
        public async Task Post_WithValidCredentials_ReturnsOkWithToken()
        {
            // Arrange
            var signInDTO = new SignInDTO
            {
                UserName = "testuser",
                Password = "Password123!"
            };

            var userDTO = new UserDTO
            {
                UserId = 1,
                UserName = "testuser",
                Email = "test@example.com"
            };

            var token = "test-jwt-token";

            _mockUserService.Setup(s => s.LoginUser(It.IsAny<SignInDTO>(), It.IsAny<StringBuilder>()))
                .ReturnsAsync(userDTO);
            _mockUserService.Setup(s => s.GenerateToken(userDTO))
                .Returns(token);

            // Act
            var result = await _controller.Post(signInDTO) as ObjectResult;
            var response = result?.Value as ApiResponse;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.IsNotNull(response);
            Assert.IsTrue(response.Success);
            Assert.AreEqual("Authenticate Success", response.Message);
            
            // Check if token and user info are returned in the data
            dynamic data = response.Data;
            Assert.AreEqual(token, data.token);
            Assert.AreEqual(userDTO.UserId, data.user.userId);
            Assert.AreEqual(userDTO.UserName, data.user.userName);
            Assert.AreEqual(userDTO.Email, data.user.email);
        }

        [Test]
        public async Task Post_WithInvalidCredentials_ReturnsOkWithFailure()
        {
            // Arrange
            var signInDTO = new SignInDTO
            {
                UserName = "nonexistent",
                Password = "WrongPassword!"
            };

            var errorMessage = "Invalid username/email or password";
            var messageBuilder = new StringBuilder();
            messageBuilder.Append(errorMessage);

            _mockUserService.Setup(s => s.LoginUser(It.IsAny<SignInDTO>(), It.IsAny<StringBuilder>()))
                .Callback<SignInDTO, StringBuilder>((_, sb) => sb.Append(errorMessage))
                .ReturnsAsync((UserDTO)null);

            // Act
            var result = await _controller.Post(signInDTO) as ObjectResult;
            var response = result?.Value as ApiResponse;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.IsNotNull(response);
            Assert.IsFalse(response.Success);
            Assert.AreEqual(errorMessage, response.Message);
        }

        [Test]
        public async Task Post_WithNullRequest_ReturnsBadRequest()
        {
            // Arrange
            SignInDTO signInDTO = null;

            // Act
            var result = await _controller.Post(signInDTO) as BadRequestObjectResult;
            var response = result?.Value as ApiResponse;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);
            Assert.IsNotNull(response);
            Assert.IsFalse(response.Success);
            Assert.AreEqual("Invalid request format", response.Message);
        }

        [Test]
        public async Task Post_WithServerError_ReturnsInternalServerError()
        {
            // Arrange
            var signInDTO = new SignInDTO
            {
                UserName = "testuser",
                Password = "Password123!"
            };

            _mockUserService.Setup(s => s.LoginUser(It.IsAny<SignInDTO>(), It.IsAny<StringBuilder>()))
                .ThrowsAsync(new Exception("Test exception"));

            // Act
            var result = await _controller.Post(signInDTO) as ObjectResult;
            var response = result?.Value as ApiResponse;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
            Assert.IsNotNull(response);
            Assert.IsFalse(response.Success);
            Assert.AreEqual("Internal server error during login", response.Message);
        }

        [Test]
        public async Task LoginGoogle_WithValidToken_ReturnsOkWithToken()
        {
            // Arrange
            string accessToken = "valid-google-access-token";
            string roleName = "Patient";

            _mockUserService.Setup(s => s.CheckValidExternalRegister(roleName, It.IsAny<StringBuilder>()))
                .ReturnsAsync(true);

            var userInfo = new Google.Apis.Oauth2.v2.Data.Userinfo
            {
                Email = "google@example.com",
                Name = "Google User"
            };

            _mockUserService.Setup(s => s.GetUserInfoAsync(accessToken))
                .ReturnsAsync(userInfo);

            _mockUserService.Setup(s => s.CheckGoogleExistAccount(userInfo.Email))
                .ReturnsAsync(true);

            var userDTO = new UserDTO
            {
                UserId = 2,
                UserName = "googleuser",
                Email = userInfo.Email
            };

            var user = new Domain.Entities.User
            {
                UserId = 2,
                UserName = "googleuser",
                Email = userInfo.Email
            };

            _mockUserService.Setup(s => s.GetUserDto(userInfo))
                .ReturnsAsync(userDTO);

            _mockUserService.Setup(s => s.GetUserById(userDTO.UserId))
                .ReturnsAsync(user);

            _mockUserService.Setup(s => s.checkLockoutAccount(user, It.IsAny<StringBuilder>()))
                .Returns(false);

            var token = "test-jwt-token";
            _mockUserService.Setup(s => s.GenerateToken(userDTO))
                .Returns(token);

            // Act
            var result = await _controller.LoginGoogle(accessToken, roleName) as ObjectResult;
            var response = result?.Value as ApiResponse;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.IsNotNull(response);
            Assert.IsTrue(response.Success);
            Assert.That(response.Message, Contains.Substring("Success"));
            Assert.AreEqual(token, response.Data);
        }

        [Test]
        public async Task RegisterPatient_WithValidData_ReturnsOkWithSuccess()
        {
            // Arrange
            var registrationDTO = new RegistrationDTO
            {
                UserName = "newpatient",
                Email = "patient@example.com",
                Password = "Password123!"
            };

            var result = new ResultDTO
            {
                Succeeded = true,
                Message = "Registration successful"
            };

            _mockUserService.Setup(s => s.RegisterPatient(registrationDTO))
                .ReturnsAsync(result);

            // Act
            var actionResult = await _controller.RegisterPatient(registrationDTO) as ObjectResult;
            var response = actionResult?.Value as ApiResponse;

            // Assert
            Assert.IsNotNull(actionResult);
            Assert.AreEqual(200, actionResult.StatusCode);
            Assert.IsNotNull(response);
            Assert.IsTrue(response.Success);
            Assert.AreEqual("Đăng ký thành công", response.Message);
        }

        [Test]
        public async Task ForgotPassword_WithValidEmail_ReturnsOkWithSuccess()
        {
            // Arrange
            string email = "user@example.com";
            string resetLink = "https://example.com/reset-password?token=abc123";

            _mockUserService.Setup(s => s.ForgotPassword(email, It.IsAny<Microsoft.AspNetCore.Http.HttpContext>()))
                .ReturnsAsync(resetLink);

            // Act
            var result = await _controller.ForgotPassword(email) as ObjectResult;
            var response = result?.Value as dynamic;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.IsTrue(response.Success);
            Assert.That(response.Message.ToString(), Contains.Substring("Password Changed request is sent on Email"));
        }

        [Test]
        public async Task ForgotPassword_WithInvalidEmail_ReturnsOkWithFailure()
        {
            // Arrange
            string email = "nonexistent@example.com";

            _mockUserService.Setup(s => s.ForgotPassword(email, It.IsAny<Microsoft.AspNetCore.Http.HttpContext>()))
                .ReturnsAsync((string)null);

            // Act
            var result = await _controller.ForgotPassword(email) as ObjectResult;
            var response = result?.Value as dynamic;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.IsFalse(response.Success);
            Assert.That(response.Message.ToString(), Contains.Substring("Could not send link to email"));
        }
    }
} 