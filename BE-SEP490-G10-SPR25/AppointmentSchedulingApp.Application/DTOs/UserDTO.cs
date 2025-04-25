using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class UserDTO
    {
        [Key]
        [JsonPropertyOrder(1)]  
        public int UserId { get; set; }

        [JsonPropertyOrder(2)]
        public string UserName { get; set; } = null!;

        [JsonPropertyOrder(3)]
        public string? Email { get; set; }

        [JsonPropertyOrder(4)]
        public string Phone { get; set; } = null!;

        [JsonPropertyOrder(5)]
        public string? Password { get; set; } = null!;

        [JsonPropertyOrder(6)]
        public long? CitizenId { get; set; }


        [JsonPropertyOrder(7)]
        public string Gender { get; set; }

        [JsonPropertyOrder(8)]
        public string Dob { get; set; }

        [JsonPropertyOrder(9)]
        public string Address { get; set; }

        [JsonPropertyOrder(10)]
        public string? AvatarUrl { get; set; }

        [JsonPropertyOrder(11)]
        public bool IsVerify { get; set; }

        [JsonPropertyOrder(12)]
        public bool IsActive { get; set; }

        [JsonPropertyOrder(13)]
        public string? RoleNames { get; set; }

        [JsonIgnore]
        public List<RoleDTO> Roles { get; set; }


    }
}