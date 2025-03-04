using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Domain.DTOs;
using AppointmentSchedulingApp.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace AppointmentSchedulingApp.Domain.Contracts.Services
{
    public interface IRoleService
    {
        Task<Role> GetRoleByNameAsync(string roleName);

        Task<List<RoleInformation>> GetRoleInformationsByUserId(string userId);
    }
}
