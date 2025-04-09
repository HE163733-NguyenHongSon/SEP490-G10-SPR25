using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public
        class PostSectionDTO:PostDTO
    {
        public string? PostImageUrl { get; set; }
        public string? PostCategory { get; set; }
        public string? AuthorBio { get; set; }
        public List<PostSectionDTO> Sections { get; set; } = new();
    }
}
