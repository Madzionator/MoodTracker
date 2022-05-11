using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoodTracker.API.DTO;
using MoodTracker.API.Interfaces;

namespace MoodTracker.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MoodController : Controller
    {
        private readonly IMoodService _moodService;

        public MoodController(IMoodService moodService)
        {
            _moodService = moodService;
        }

        [Authorize]
        [HttpPost]
        public IActionResult AddMood([FromBody] MoodAddDto moodAddDto)
        {
            _moodService.AddMood(moodAddDto);
            return NoContent();
        }

        [Authorize]
        [HttpGet("all")]
        public IActionResult GetMoods()
        {
            var moods = _moodService.GetMoods();
            return Ok(moods);
        }
    }
}
