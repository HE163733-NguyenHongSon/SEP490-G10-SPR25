using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AppointmentSchedulingApp.Application.IServices;
using AppointmentSchedulingApp.Application.DTOs;
namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService;
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
            var post = await _postService.GetPostByIdAsync(id);
            if (post == null) return NotFound();
            return Ok(post);
        }
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] PostDetailDTO postDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _postService.AddPostAsync(postDTO);
            return Ok();
        }
    }
}
