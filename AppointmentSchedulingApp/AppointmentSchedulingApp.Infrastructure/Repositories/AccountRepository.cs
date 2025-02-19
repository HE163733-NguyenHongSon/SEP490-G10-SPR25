using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Domain.Contracts.Repositories;
using AppointmentSchedulingApp.Domain.DTOs;
using AppointmentSchedulingApp.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace AppointmentSchedulingApp.Infrastructure.Repositories
{
    public class AccountRepository : IAccountRepository
    {


        public AccountRepository(UserManager<User> userManager) 
        {
            
        }
        public Task<string> SignInAsync(SignInDTO signInDTO)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityResult> SignUpAsync(RegistrationDTO registrationDTO)
        {
            throw new NotImplementedException();
        }
    }
}
