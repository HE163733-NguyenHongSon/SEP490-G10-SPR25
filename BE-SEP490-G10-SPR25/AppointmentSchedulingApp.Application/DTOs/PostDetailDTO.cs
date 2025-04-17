using AppointmentSchedulingApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class PostDetailDTO:PostDTO
    {
        [JsonPropertyOrder(7)]
        public string? PostImageUrl { get; set; }

        [JsonPropertyOrder(8)]
        public string? PostCategory { get; set; }

        [JsonPropertyOrder(9)]
        public string? AuthorBio { get; set; }
        [JsonPropertyOrder(10)]
        public List<PostSectionDTO> PostSections { get; set; } = new();
        [JsonPropertyOrder(11)]
        public List<CommentDTO> Comments { get; set; } = new();
    }
}
