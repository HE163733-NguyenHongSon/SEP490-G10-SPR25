using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Domain.Entities;

public partial class Post
{
    public int PostId { get; set; }

    public int? PostAuthorId { get; set; }

    public string PostTitle { get; set; } = null!;

    public string PostDescription { get; set; } = null!;

    public DateTime PostCreatedDate { get; set; }

    public string? PostSourceUrl { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual Doctor? PostAuthor { get; set; }

    public virtual ICollection<PostSection> PostSections { get; set; } = new List<PostSection>();
}
