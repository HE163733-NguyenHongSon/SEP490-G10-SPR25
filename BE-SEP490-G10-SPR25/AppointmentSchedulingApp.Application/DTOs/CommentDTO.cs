using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class CommentDTO
    {
        public int CommentId { get; set; }
        public string Content { get; set; }
        public int? UserId { get; set; }
        public int PostId { get; set; }
        public DateTime CommentOn { get; set; }
        public int? RepliedCommentId { get; set; }
        public int NumberOfLikes { get; set; }
    }
}
