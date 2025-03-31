using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSchedulingApp.Domain.IRepositories;
using Microsoft.EntityFrameworkCore;
using AppointmentSchedulingApp.Infrastructure.Database;

namespace AppointmentSchedulingApp.Application.Services
{
    public class RoleService : IRoleService
    {
        private readonly IGenericRepository<Role> _roleRepository;
        private readonly AppointmentSchedulingDbContext _dbContext;

        public RoleService(IGenericRepository<Role> roleRepository, AppointmentSchedulingDbContext dbContext)
        {
            _roleRepository = roleRepository;
            _dbContext = dbContext;
        }
        
        public async Task<Role> GetRoleByNameAsync(string roleName)
        {
            var role = await _roleRepository.Get(r => r.RoleName.Equals(roleName, StringComparison.OrdinalIgnoreCase));
            return role;
        }

        public async Task<List<RoleInformation>> GetRoleInformationsByUserId(string userId)
        {
            Console.WriteLine($"GetRoleInformationsByUserId called for userId: {userId}");
            List<RoleInformation> data = new List<RoleInformation>();
            
            try
            {
                if (string.IsNullOrEmpty(userId))
                {
                    Console.WriteLine("GetRoleInformationsByUserId: userId is null or empty");
                    return data;
                }
                
                int userIdInt;
                if (!int.TryParse(userId, out userIdInt))
                {
                    Console.WriteLine($"GetRoleInformationsByUserId: Invalid userId format: {userId}");
                    return data;
                }

                // Lấy vai trò của người dùng từ database sử dụng LINQ và Entity Framework
                var userRoles = await _dbContext.Users
                    .Where(u => u.UserId == userIdInt)
                    .SelectMany(u => u.Roles)
                    .ToListAsync();
                
                Console.WriteLine($"GetRoleInformationsByUserId: Found {userRoles.Count} roles for user");
                
                foreach (var role in userRoles)
                {
                    Console.WriteLine($"GetRoleInformationsByUserId: Adding role: {role.RoleName}, id: {role.RoleId}");
                    data.Add(new RoleInformation
                    {
                        RoleId = role.RoleId.ToString(),
                        RoleName = role.RoleName
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"GetRoleInformationsByUserId Error: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
            }
            
            Console.WriteLine($"GetRoleInformationsByUserId returning {data.Count} roles");
            return data;
        }
    }
}
