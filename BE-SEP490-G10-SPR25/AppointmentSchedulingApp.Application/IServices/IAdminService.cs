using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Domain.Entities;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IAdminService
    {
        Task<List<UserDTO>> GetAllAccounts();
        Task<Dictionary<string, List<UserDTO>>> GetAccountsByType();
        Task<UserDTO> CreateDoctorAccount(AdminDTO adminDTO);
        Task<UserDTO> CreateReceptionistAccount(AdminDTO adminDTO);
        Task<UserDTO> UpdateAccount(int userId, AdminDTO adminDTO);
        Task<bool> DeleteAccount(int userId);
        Task<bool> ToggleAccountStatus(int userId, bool isActive);
        Task<List<RoleDTO>> GetAllRoles();
        Task<bool> AssignRole(int userId, int roleId);
        Task<bool> RemoveRole(int userId, int roleId);
        //manh lam
        //int TotalAppointmentScheduleDashboard();
        //int TotalPatientDashboard();
        //int TotalDoctorDashboard();
        //int TotalServiceDashboard();
        //double AppointmentSchedulePercentChangeDashboard();
        DashboardAdminDTO DashboardAdmin();

        Task<List<StatisticDTO>> GetStatisticsForLast12Months();
    }
}