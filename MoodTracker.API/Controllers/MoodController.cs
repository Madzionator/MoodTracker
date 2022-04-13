/*using Microsoft.AspNetCore.Authorization;
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
        private readonly IUserInfoProvider _userInfoProvider;

        public MoodController(IUserInfoProvider userInfoProvider, IMoodService moodService)
        {
            _moodService = moodService;
            _userInfoProvider = userInfoProvider;
        }

        [Authorize]
        [HttpPost("add")]
        public IActionResult AddMood([FromBody] MoodDto moodDto)
        {
            _moodService.AddMood(moodDto, _userInfoProvider.Id);
            return NoContent();
        }

        [Authorize]
        [HttpGet("get")]
        public IActionResult GetMoods()
        {
            var moods = _moodService.GetMoods(_userInfoProvider.Id);
            return Ok(moods);
        }
    }
}

*/
