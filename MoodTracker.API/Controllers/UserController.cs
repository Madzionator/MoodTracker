using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoodTracker.API.DTO;
using MoodTracker.API.Interfaces;

namespace MoodTracker.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public IActionResult Login([FromBody] UserLoginDto dto)
        {
            var token = _userService.Login(dto);
            return Ok(token);
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult CreateUser([FromBody] UserDto userDto)
        {
            _userService.CreateUser(userDto);
            return NoContent();
        }

        // do pierwszych testów, niedługo usunąć
        [Authorize]
        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("logowanie i token wam działa xD 👏");
        }
    }
}
