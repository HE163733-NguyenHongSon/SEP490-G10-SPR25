﻿using AppointmentSchedulingApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.IRepositories
{
    public interface IPostRepository : IGenericRepository<Post>
    {
        Task<IQueryable<Post>> GetAllPosts();
        Task<Post?> GetPostById(int id);
    }
}
