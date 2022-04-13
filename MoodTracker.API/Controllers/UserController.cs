using System.Text.Json;
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
            return Ok(new { Token = token });
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult CreateUser([FromBody] UserRegDto userRegDto)
        {
            _userService.CreateUser(userRegDto);
            return NoContent();
        }

        [Authorize]
        [HttpGet("info")]
        public IActionResult GetUser()
        {
            UserDto userInfo = _userService.GetInfo();
            return Ok(userInfo);
        }
    }
}
