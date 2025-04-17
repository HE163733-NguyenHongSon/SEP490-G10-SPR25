using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.Services;
using System.Text.Json;
namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IStorageService _storageService;
        public PostController(IPostService postService, IStorageService storageService)
        {
            _postService = postService;
            _storageService = storageService;
        }
        [HttpGet]
        public async Task<ActionResult<List<PostDTO>>> GetAllPosts()
        {
            var posts = await _postService.GetAllPostsAsync();
            return Ok(posts);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDTO>> GetPostById(int id)
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

        [HttpPost]
        [RequestSizeLimit(200_000_000)]
        public async Task<IActionResult> CreatePostWithImages([FromForm] IFormCollection form)
        {
            try
            {
                var postTitle = form["postTitle"].ToString();
                var postDescription = form["postDescription"].ToString();
                var postSourceUrl = form["postSourceUrl"].ToString();
                int.TryParse(form["postAuthorId"].ToString(), out int authorId);
                var postSectionsJson = form["postSectionsJson"].ToString();

                var files = form.Files;
                var uploadedUrls = await _storageService.UploadFilesAsync(files.ToList());

                var postSections = JsonSerializer.Deserialize<List<PostSectionDTO>>(postSectionsJson);
                if (postSections == null) return BadRequest("Invalid post sections data");

                var baseUrl = Environment.GetEnvironmentVariable("S3_BASE_URL") ?? "";

                int imageIndex = 0;
                foreach (var section in postSections)
                {
                    if (!string.IsNullOrEmpty(section.PostImageUrl) && imageIndex < uploadedUrls.Count)
                    {
                        section.PostImageUrl = $"{baseUrl}/{uploadedUrls[imageIndex++].FileName}";
                    }
                }

                var postDTO = new PostDetailDTO
                {
                    PostTitle = postTitle,
                    PostDescription = postDescription,
                    PostSourceUrl = postSourceUrl,
                    PostSections = postSections
                };

                await _postService.AddPostAsync(postDTO);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi server: {ex.Message}");
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
