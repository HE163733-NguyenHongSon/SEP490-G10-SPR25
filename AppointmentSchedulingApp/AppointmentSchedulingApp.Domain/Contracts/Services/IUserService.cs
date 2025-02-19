using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Domain.DTOs;
using Microsoft.AspNetCore.Identity;

namespace AppointmentSchedulingApp.Domain.Contracts.Services
{
    public interface IUserService
    {
        Task<UserDTO?> LoginUser(SignInDTO userLogin, StringBuilder message);
        Task<UserDTO?> RegisterUser(RegistrationDTO registrationDto, StringBuilder message);
        string GenerateToken(UserDTO user);


        public Task<IdentityResult> SignUpAsync(RegistrationDTO registrationDTO);
        public Task<string> SignInAsync(SignInDTO signInDTO);


        public Task<IdentityResult?> RegisterPatient(RegistrationDTO registrationDTO);
    }
}
