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
        [HttpGet("week")]
        public IActionResult GetWeek()
        {
            var weekmoods = _moodService.GetWeek();
            return Ok(weekmoods);
        }

        [Authorize]
        [HttpGet("month")]
        public IActionResult GetMonth()
        {
            var monthmoods = _moodService.GetMonth();
            return Ok(monthmoods);
        }
    }
}
