using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Services.IServices
{
    public interface IRoleService
    {
        Task<Role> GetRoleByNameAsync(string roleName);

        Task<List<RoleInformation>> GetRoleInformationsByUserId(string userId);
    }
}
