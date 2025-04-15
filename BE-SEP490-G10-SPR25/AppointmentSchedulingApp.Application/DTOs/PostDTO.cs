using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class PostDTO
    {
        [JsonPropertyOrder(1)]
        public int PostId { get; set; }

        [JsonPropertyOrder(2)]
        public string PostTitle { get; set; }

        [JsonPropertyOrder(3)]
        public string PostDescription { get; set; }

        [JsonPropertyOrder(4)]
        public DateTime PostCreatedDate { get; set; }

        [JsonPropertyOrder(5)]
        public string PostSourceUrl { get; set; } = "";

        [JsonPropertyOrder(6)]
        public string? AuthorName { get; set; }
        [JsonPropertyOrder(7)]
        public string? PostImageUrl { get; set; }
        [JsonPropertyOrder(8)]
        public int? AuthorId { get; set; }
    }
}
