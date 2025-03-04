using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Services.DTOs;
using Google.Apis.Oauth2.v2.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Services.Services
{
    public interface IUserService
    {
        Task<UserDTO?> LoginUser(SignInDTO userLogin, StringBuilder message);
        //Task<UserDTO?> RegisterUser(RegistrationDTO registrationDto, StringBuilder message);
        string GenerateToken(UserDTO user);
        //public Task<IdentityResult> SignUpAsync(RegistrationDTO registrationDTO);
        //public Task<string> SignInAsync(SignInDTO signInDTO);
        Task<IdentityResult?> RegisterPatient(RegistrationDTO registrationDTO);



        Task<bool> CheckValidExternalRegister(string roleName, StringBuilder message);
        Task<Userinfo> GetUserInfoAsync(string accessToken);
        Task<bool> CheckGoogleExistAccount(string email);
        Task<IdentityResult?> ExternalRegisterUser(Userinfo userInfo, string roleName);
        Task<UserDTO> GetUserDto(Userinfo userinfo);
        Task<User> GetUserById(int userId);
        bool checkLockoutAccount(User user, StringBuilder message);




        Task<string?> ForgotPassword(string email, HttpContext httpContext);
        Task<bool> ValidateResetPasswordAsync(ResetPassword resetPassword, StringBuilder message);
        Task<IdentityResult> ResetPassword(ResetPassword resetPassword);
    }
}
