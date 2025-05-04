using Amazon.S3;
using Amazon.S3.Transfer;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Infrastructure.Helper;
using Microsoft.Extensions.Options;
using System.IO;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Logging;
using Amazon.Runtime;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
namespace AppointmentSchedulingApp.Application.Services
{


    public class StorageService : IStorageService
    {
        private readonly ILogger<StorageService> _logger;
        private readonly IConfiguration _configuration;
        private readonly AwsCredentials _credentials;
        private readonly string _bucketName;

        public StorageService(ILogger<StorageService> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;

            _credentials = new AwsCredentials
            {
                AwsKey = _configuration["AWS:AccessKey"],
                AwsSecretKey = _configuration["AWS:SecretKey"]
            };

            _bucketName = _configuration["AWS:BucketName"];
        }

        public async Task<S3DTO> UploadFileAsync(S3 s3)
        {
            var response = new S3DTO();

            try
            {
                // Validate input
                if (s3?.InputStream == null || string.IsNullOrEmpty(s3.BucketName))
                {
                    throw new ArgumentException("Invalid S3 object or bucket name");
                }

                // Configure AWS credentials
                var credentials = new BasicAWSCredentials(
                    _credentials.AwsKey,
                    _credentials.AwsSecretKey);

                var config = new AmazonS3Config()
                {
                    RegionEndpoint = Amazon.RegionEndpoint.APSoutheast2,
                    Timeout = TimeSpan.FromSeconds(30),
                    MaxErrorRetry = 3
                };
                var uploadRequest = new TransferUtilityUploadRequest
                {
                    InputStream = s3.InputStream,
                    Key = s3.Name,
                    BucketName = s3.BucketName,
                    ContentType = s3.ContentType,
                    StorageClass = S3StorageClass.Standard,
                    AutoCloseStream = false,
                    PartSize = 8 * 1024 * 1024
                };
                using var client = new AmazonS3Client(credentials, config);
                var transferUtility = new TransferUtility(client);
                await transferUtility.UploadAsync(uploadRequest);

                response.StatusCode = 200;
                response.Message = $"File {s3.Name} uploaded successfully to {s3.BucketName}";
                response.FileName = s3.Name;

            }
            catch (AmazonS3Exception ex)
            {
                _logger.LogError(ex, "S3 Upload Error");
                response.StatusCode = (int)ex.StatusCode;
                response.Message = ex.Message;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Upload Error");
                response.StatusCode = 500;
                response.Message = ex.Message;
            }
            finally
            {
                s3?.InputStream?.Dispose();
            }

            return response;
        }

        public async Task<List<S3DTO>> UploadFilesAsync(List<IFormFile> files)
        {
            var results = new List<S3DTO>();
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".pdf", ".mp4" };

            foreach (var file in files)
            {
                var fileExt = Path.GetExtension(file.FileName).ToLowerInvariant();

                // Kiểm tra loại file
                if (string.IsNullOrEmpty(fileExt) || !allowedExtensions.Contains(fileExt))
                {
                    results.Add(new S3DTO
                    {
                        StatusCode = 400,
                        FileName = file.FileName,
                        Message = "Invalid file type"
                    });
                    continue;
                }

                var newFileName = file.FileName; 

                await using var memoryStream = new MemoryStream();
                await file.CopyToAsync(memoryStream);
                memoryStream.Position = 0;

                var s3 = new S3
                {
                    BucketName = _bucketName,
                    InputStream = memoryStream,
                    Name = newFileName,
                    ContentType = file.ContentType
                };

                var result = await UploadFileAsync(s3);
                results.Add(result);
            }

            return results;
        }


    }


}
