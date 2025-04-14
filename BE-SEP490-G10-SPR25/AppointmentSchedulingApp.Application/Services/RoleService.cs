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
            var role = await _roleRepository.Get(r => r.RoleName.ToLower() == roleName.ToLower());
            return role;
        }

        public async Task<List<RoleDTO>> GetRoleDTOsByUserId(string userId)
        {
            Console.WriteLine($"GetRoleDTOsByUserId called for userId: {userId}");
            List<RoleDTO> data = new List<RoleDTO>();
            
            try
            {
                if (string.IsNullOrEmpty(userId))
                {
                    Console.WriteLine("GetRoleDTOsByUserId: userId is null or empty");
                    return data;
                }
                
                int userIdInt;
                if (!int.TryParse(userId, out userIdInt))
                {
                    Console.WriteLine($"GetRoleDTOsByUserId: Invalid userId format: {userId}");
                    return data;
                }

                // Lấy vai trò của người dùng từ database sử dụng LINQ và Entity Framework
                var userRoles = await _dbContext.Users
                    .Where(u => u.UserId == userIdInt)
                    .SelectMany(u => u.Roles)
                    .ToListAsync();
                
                Console.WriteLine($"GetRoleDTOsByUserId: Found {userRoles.Count} roles for user");
                
                foreach (var role in userRoles)
                {
                    Console.WriteLine($"GetRoleDTOsByUserId: Adding role: {role.RoleName}, id: {role.RoleId}");
                    data.Add(new RoleDTO
                    {
                        RoleId = role.RoleId.ToString(),
                        RoleName = role.RoleName
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"GetRoleDTOsByUserId Error: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
            }
            
            Console.WriteLine($"GetRoleDTOsByUserId returning {data.Count} roles");
            return data;
        }
    }
}
