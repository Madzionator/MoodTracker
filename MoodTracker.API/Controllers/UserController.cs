using Microsoft.AspNetCore.Mvc;
using MoodTracker.API.DTO;
using MoodTracker.API.Services;

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
    }
}
