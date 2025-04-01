using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Application.DTOs;
using Google.Apis.Oauth2.v2.Data;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IUserService
    {
        Task<UserDTO?> LoginUser(SignInDTO userLogin, StringBuilder message);

        string GenerateToken(UserDTO user);
        Task<ResultDTO> RegisterPatient(RegistrationDTO registrationDTO);

        Task<bool> CheckValidExternalRegister(string roleName, StringBuilder message);
        Task<Userinfo> GetUserInfoAsync(string accessToken);
        Task<bool> CheckGoogleExistAccount(string email);
        Task<ResultDTO> ExternalRegisterUser(Userinfo userInfo, string roleName);
        Task<UserDTO> GetUserDto(Userinfo userinfo);
        Task<User> GetUserById(int userId);
        bool checkLockoutAccount(User user, StringBuilder message);

        Task<string?> ForgotPassword(string email, HttpContext httpContext);
        Task<bool> ValidateResetPasswordAsync(ResetPassword resetPassword, StringBuilder message);
        Task<ResultDTO> ResetPassword(ResetPassword resetPassword);
    }
}