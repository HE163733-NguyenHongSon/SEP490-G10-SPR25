using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IStorageService

    {
        Task<S3DTO> UploadFileAsync(S3 s3);
        Task<List<S3DTO>> UploadFilesAsync(List<IFormFile> files);
    }
}
