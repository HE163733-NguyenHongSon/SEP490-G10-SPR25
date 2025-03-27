using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class Comment
{
    public int CommentId { get; set; }

    public string Content { get; set; } = null!;

    public int? UserId { get; set; }

    public int PostId { get; set; }

    public DateTime CommentOn { get; set; }

    public int? RepliedCommentId { get; set; }

    public int NumberOfLikes { get; set; }

    public virtual Post Post { get; set; } = null!;

    public virtual User? User { get; set; }
}
