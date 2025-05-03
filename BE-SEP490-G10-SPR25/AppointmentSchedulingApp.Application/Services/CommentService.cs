using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.Services
{
    public class CommentService : ICommentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CommentService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<CommentDTO> AddCommentAsync(CommentDTO commentDto)
        {
            var comment = _mapper.Map<Comment>(commentDto);
            comment.CommentOn = DateTime.Now;
            await _unitOfWork.CommentRepository.AddAsync(comment);
            return _mapper.Map<CommentDTO>(comment);
        }

        public async Task<List<CommentDTO>> GetCommentsByPostIdAsync(int postId)
        {
            var comments = await _unitOfWork.CommentRepository.GetCommentsByPostIdAsync(postId);
            return _mapper.Map<List<CommentDTO>>(comments);
        }
        public async Task<CommentDTO?> EditCommentAsync(int commentId, string newContent)
        {
            var comment = await _unitOfWork.CommentRepository.GetByIdAsync(commentId);
            if (comment == null) return null;

            comment.Content = newContent;
            comment.CommentOn = DateTime.Now;

            _unitOfWork.CommentRepository.Update(comment);
            await _unitOfWork.CommitAsync();

            return _mapper.Map<CommentDTO>(comment);
        }
        public async Task<bool> DeleteCommentAsync(int commentId)
        {
            try
            {
                await _unitOfWork.CommentRepository.DeleteAsync(commentId);
                return true;
            } catch
            {
                return false;
            }
        }
    }
}
