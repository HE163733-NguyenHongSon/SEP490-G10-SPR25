using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.Services;
using System.Text.Json;
using Castle.Core.Logging;
using AppointmentSchedulingApp.Domain.Entities;
using Newtonsoft.Json;
using Amazon.S3.Model;
using Amazon.S3;
namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IStorageService _storageService;
        private readonly IConfiguration _configuration;
        public PostController(IPostService postService, IStorageService storageService, IConfiguration configuration)
        {
            _postService = postService;
            _storageService = storageService;
            _configuration = configuration;
        }
        [HttpGet]
        public async Task<ActionResult<List<PostDTO>>> GetAllPosts()
        {
            var posts = await _postService.GetAllPostsAsync();
            return Ok(posts);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDetailDTO>> GetPostById(int id)
        {
            var post = await _postService.GetPostDetailAsync(id);
            if (post == null) return NotFound();
            return Ok(post);
        }
        //[HttpPost]
        //public async Task<IActionResult> CreatePost([FromBody] PostDetailDTO postDTO)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    await _postService.AddPostAsync(postDTO);
        //    return Ok();
        //}
        [HttpPost("test-upload")]
        public async Task<IActionResult> TestUpload([FromForm] UploadFileDTO dto)
        {
            if (dto.File == null || dto.File.Length == 0)
                return BadRequest("No file uploaded");
            var extension = Path.GetExtension(dto.File.FileName);
            var newFileName = $"post-{Guid.NewGuid()}{extension}";
            await using var stream = new MemoryStream();
            await dto.File.CopyToAsync(stream);
            stream.Position = 0;

            var formFileWithNewName = new FormFile(stream, 0, stream.Length, dto.File.Name, newFileName)
            {
                Headers = dto.File.Headers,
                ContentType = dto.File.ContentType
            };

            // ✨ Upload bằng StorageService
            var resultList = await _storageService.UploadFilesAsync(new List<IFormFile> { formFileWithNewName });
            var result = resultList.First();

            // ✨ Dựng URL thủ công
            if (result.StatusCode == 200 && !string.IsNullOrEmpty(result.FileName))
            {
                var bucketName = _configuration["AWS:BucketName"];
                var url = $"https://{bucketName}.s3.amazonaws.com/{result.FileName}";

                return Ok(new
                {
                    result.StatusCode,
                    result.Message,
                    result.FileName,
                    Url = url
                });
            }

            return Ok(result);
        }

        //public async Task<int> GetNextIndexOfSection()
        //{
        //    var awsKey = _configuration["AWS:AccessKey"];
        //    var awsSecret = _configuration["AWS:SecretKey"];
        //    var bucketName = _configuration["AWS:BucketName"];
        //    var s3Client = new AmazonS3Client(
        //    awsKey,
        //    awsSecret,
        //    new AmazonS3Config
        //    {
        //        RegionEndpoint = Amazon.RegionEndpoint.APSoutheast2
        //    });

        //    var listRequest = new ListObjectsV2Request
        //    {
        //        BucketName = bucketName,
        //        Prefix = "phan_"
        //    };

        //    var listResponse = await s3Client.ListObjectsV2Async(listRequest);

        //    int maxIndex = listResponse.S3Objects
        //        .Select(obj =>
        //        {
        //            var name = Path.GetFileNameWithoutExtension(obj.Key); // ví dụ: phan_5
        //            var parts = name.Split('_');
        //            return parts.Length == 2 && int.TryParse(parts[1], out var idx) ? idx : -1;
        //        })
        //        .Where(i => i >= 0)
        //        .DefaultIfEmpty(-1)
        //        .Max();

        //    return maxIndex + 1;
        //}

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromForm] IFormFileCollection files)
        {
            var form = Request.Form;

            string postTitle = form["postTitle"];
            string postDescription = form["postDescription"];
            string postSourceUrl = form["postSourceUrl"];
            int postAuthorId = int.Parse(form["postAuthorId"]);
            string postSectionsJson = form["postSectionsJson"];

            var sections = JsonConvert.DeserializeObject<List<PostSectionDTO>>(postSectionsJson);
            if (sections == null || sections.Count == 0)
                return BadRequest("Phải có ít nhất một section");

            // Upload ảnh tương ứng
            var uploadedUrls = new List<string>();

            int sectionCount = await _postService.GetPostSectionsCountAsync();

            foreach (var file in files)
            {
                var ext = Path.GetExtension(file.FileName);
                var matchingSection = sections
                .Where(s => s.PostImageUrl == "")
                .OrderBy(s => s.SectionIndex)
                .Skip(uploadedUrls.Count)
                .FirstOrDefault();

                if (matchingSection == null)
                    return BadRequest("Không tìm thấy section tương ứng để đặt tên ảnh");

                var fileIndex = sectionCount + matchingSection.SectionIndex;
                var fileName = $"phan_{fileIndex}{ext}";

                await using var ms = new MemoryStream();
                await file.CopyToAsync(ms);
                ms.Position = 0;

                var newFormFile = new FormFile(ms, 0, ms.Length, file.Name, fileName)
                {
                    Headers = file.Headers,
                    ContentType = file.ContentType
                };

                var result = await _storageService.UploadFilesAsync(new List<IFormFile> { newFormFile });
                var uploaded = result.FirstOrDefault();

                if (uploaded?.StatusCode == 200)
                {
                    var bucket = _configuration["AWS:BucketName"];
                    var url = $"https://{bucket}.s3.amazonaws.com/{uploaded.FileName}";
                    uploadedUrls.Add(uploaded.FileName);
                }
                else
                {
                    return BadRequest($"Upload ảnh thất bại: {uploaded?.Message}");
                }
            }

            // Gắn URL ảnh vào đúng section
            int imgIndex = 0;
            for (int i = 0; i < sections.Count; i++)
            {
                if (sections[i].PostImageUrl == "")
                {
                    if (imgIndex >= uploadedUrls.Count)
                        return BadRequest("Số lượng ảnh không khớp số section cần ảnh");

                    sections[i].PostImageUrl = uploadedUrls[imgIndex++];
                }
            }

            // Gọi service để lưu bài viết
            var postDTO = new PostDetailDTO
            {
                PostTitle = postTitle,
                PostDescription = postDescription,
                PostSourceUrl = postSourceUrl,
                AuthorId = postAuthorId,
                PostSections = sections
            };

            await _postService.AddPostAsync(postDTO);

            return Ok(new { message = "Tạo bài viết thành công" });
        }

        //[HttpPost]
        //[RequestSizeLimit(200_000_000)]
        //public async Task<IActionResult> CreatePostWithImages([FromForm] IFormCollection form)
        //{
        //    try
        //    {
        //        var postTitle = form["postTitle"].ToString();
        //        var postDescription = form["postDescription"].ToString();
        //        var postSourceUrl = form["postSourceUrl"].ToString();
        //        int.TryParse(form["postAuthorId"].ToString(), out int authorId);
        //        var postSectionsJson = form["postSectionsJson"].ToString();

        //        var files = form.Files;
        //        var uploadedUrls = await _storageService.UploadFilesAsync(files.ToList());

        //        var postSections = JsonSerializer.Deserialize<List<PostSectionDTO>>(postSectionsJson);
        //        if (postSections == null) return BadRequest("Invalid post sections data");

        //        var baseUrl = Environment.GetEnvironmentVariable("S3_BASE_URL") ?? "";

        //        int imageIndex = 0;
        //        foreach (var section in postSections)
        //        {
        //            if (!string.IsNullOrEmpty(section.PostImageUrl) && imageIndex < uploadedUrls.Count)
        //            {
        //                section.PostImageUrl = $"{baseUrl}/{uploadedUrls[imageIndex++].FileName}";
        //            }
        //        }

        //        var postDTO = new PostDetailDTO
        //        {
        //            PostTitle = postTitle,
        //            PostDescription = postDescription,
        //            PostSourceUrl = postSourceUrl,
        //            PostSections = postSections
        //        };

        //        await _postService.AddPostAsync(postDTO);
        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Lỗi server: {ex.Message}");
        //    }
        //}

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPost(int id, [FromForm] IFormFileCollection files)
        {
            var form = Request.Form;

            string postTitle = form["postTitle"];
            string postDescription = form["postDescription"];
            string postSourceUrl = form["postSourceUrl"];
            int postAuthorId = int.Parse(form["postAuthorId"]);
            string postSectionsJson = form["postSectionsJson"];

            var sections = JsonConvert.DeserializeObject<List<PostSectionDTO>>(postSectionsJson);
            if (sections == null || sections.Count == 0)
                return BadRequest("Phải có ít nhất một section");

            // Lấy tổng số PostSections hiện tại
            int sectionCount = await _postService.GetPostSectionsCountAsync();

            var uploadedUrls = new List<string>();
            int fileIndex = 0;

            foreach (var file in files)
            {
                var ext = Path.GetExtension(file.FileName);

                // Tìm section cần gán ảnh (section mới)
                var matchingSection = sections
                    .Where(s => string.IsNullOrEmpty(s.PostImageUrl))
                    .OrderBy(s => s.SectionIndex)
                    .Skip(fileIndex)
                    .FirstOrDefault();

                if (matchingSection == null)
                    return BadRequest("Không tìm thấy section tương ứng để đặt tên ảnh");

                var fileName = $"phan_{sectionCount + matchingSection.SectionIndex}{ext}";

                await using var ms = new MemoryStream();
                await file.CopyToAsync(ms);
                ms.Position = 0;

                var newFormFile = new FormFile(ms, 0, ms.Length, file.Name, fileName)
                {
                    Headers = file.Headers,
                    ContentType = file.ContentType
                };

                var result = await _storageService.UploadFilesAsync(new List<IFormFile> { newFormFile });
                var uploaded = result.FirstOrDefault();

                if (uploaded?.StatusCode == 200)
                {
                    matchingSection.PostImageUrl = uploaded.FileName;
                    uploadedUrls.Add(uploaded.FileName);
                }
                else
                {
                    return BadRequest($"Upload ảnh thất bại: {uploaded?.Message}");
                }

                fileIndex++;
            }

            // Gọi service cập nhật bài viết
            var postDTO = new PostDetailDTO
            {
                PostId = id,
                PostTitle = postTitle,
                PostDescription = postDescription,
                PostSourceUrl = postSourceUrl,
                AuthorId = postAuthorId,
                PostSections = sections
            };

            try
            {
                await _postService.UpdatePostAsync(postDTO);
                return Ok(new { message = "Sua bai viet thanh cong" });
            }
            catch (Exception ex)
            {
                var message = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return StatusCode(500, $"Lỗi server: {message}");
            }
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            try
            {
                var success = await _postService.DeletePostAsync(id);
                if (!success) return NotFound();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi server: {ex.Message}");
            }
        }

    }
}
