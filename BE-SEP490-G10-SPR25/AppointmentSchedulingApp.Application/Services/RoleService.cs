using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Services
{
    public class RoleService : IRoleService
    {
        private readonly RoleManager<Role> _roleManager;
        public readonly UserManager<User> _userManager;
        public RoleService(RoleManager<Role> roleManager, UserManager<User> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }
        public async Task<Role> GetRoleByNameAsync(string roleName)
        {
            var role = _roleManager.Roles.FirstOrDefault(r => r.RoleName.Equals(roleName, StringComparison.OrdinalIgnoreCase));
            return role;
        }

        public async Task<List<RoleInformation>> GetRoleInformationsByUserId(string userId)
        {
            List<RoleInformation> data = new List<RoleInformation>();
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    throw new Exception("User not found");
                }
                var roles = await _userManager.GetRolesAsync(user);
                foreach (var role in roles)
                {
                    Role identityRole = await _roleManager.FindByNameAsync(role);
                    data.Add(new RoleInformation
                    {
                        RoleId = identityRole.RoleId.ToString(),
                        RoleName = identityRole.RoleName
                    });
                }
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync($"GetRoleInformationByUserId: {ex.Message}");
            }
            return data;
        }
    }
}
