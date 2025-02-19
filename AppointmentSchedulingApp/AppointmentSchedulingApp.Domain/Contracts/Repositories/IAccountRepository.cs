using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Domain.DTOs;
using Microsoft.AspNetCore.Identity;

namespace AppointmentSchedulingApp.Domain.Contracts.Repositories
{
    public interface IAccountRepository
    {
        public Task<IdentityResult> SignUpAsync(RegistrationDTO registrationDTO);
        public Task<string> SignInAsync(SignInDTO signInDTO);
    }
}
