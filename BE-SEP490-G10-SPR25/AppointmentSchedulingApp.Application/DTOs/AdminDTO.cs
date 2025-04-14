using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class AdminDTO
    {
        [JsonPropertyOrder(1)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [JsonPropertyOrder(2)]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [JsonPropertyOrder(3)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [JsonPropertyOrder(4)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [JsonPropertyOrder(5)]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [JsonPropertyOrder(6)] 
        public string Gender { get; set; } = string.Empty;

        [Required]
        [JsonPropertyOrder(7)]
        public string Dob { get; set; } = string.Empty;

        [JsonPropertyOrder(8)]
        public string Address { get; set; } = string.Empty;

        [JsonPropertyOrder(9)]
        public string Role { get; set; } = string.Empty;

        [Required]
        [JsonPropertyOrder(10)]
        public long CitizenId { get; set; }
    }
}