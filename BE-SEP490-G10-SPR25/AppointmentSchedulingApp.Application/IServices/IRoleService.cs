using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IRoleService
    {
        Task<Role> GetRoleByNameAsync(string roleName);

        Task<List<RoleDTO>> GetRoleDTOsByUserId(string userId);
    }
}
