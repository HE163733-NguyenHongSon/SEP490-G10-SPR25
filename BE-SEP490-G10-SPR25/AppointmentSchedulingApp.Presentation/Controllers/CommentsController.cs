using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Application.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentSchedulingApp.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;
        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }
        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] CommentDTO comment)
        {
            var added = await _commentService.AddCommentAsync(comment);
            return Ok(added);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditComment(int id, [FromBody] string newContent)
        {
            var result = await _commentService.EditCommentAsync(id, newContent);
            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpDelete("{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            var success = await _commentService.DeleteCommentAsync(commentId);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
