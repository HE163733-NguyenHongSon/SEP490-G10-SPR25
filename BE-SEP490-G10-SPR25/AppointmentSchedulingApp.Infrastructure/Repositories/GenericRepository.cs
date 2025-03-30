<<<<<<< HEAD
﻿

=======
﻿using AppointmentSchedulingApp.Domain.Entities;
>>>>>>> HE161511-DinhQuangTung
using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly AppointmentSchedulingDbContext _dbContext;
        internal DbSet<T> _dbSet;

        public GenericRepository(AppointmentSchedulingDbContext dbContext)
        {
            _dbContext = dbContext;
            this._dbSet = dbContext.Set<T>();
        }

        public void Add(T entity)
        {
            _dbSet.Add(entity);
        }

        public async Task<T> Get(Expression<Func<T, bool>> expression)
        {
            IQueryable<T> query = _dbSet;
            return await query.AsNoTracking().FirstOrDefaultAsync(expression);
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> expression)
        {
            return await _dbSet.Where(expression).ToListAsync();
        }

        public void Remove(T entity)
        {
            _dbSet.Remove(entity);
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }
    }
}
