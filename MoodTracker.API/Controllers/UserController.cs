using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
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
        [HttpGet]
        public IActionResult GetInfo()
        {
            var info = _userService.GetInfo();
            return Ok(info);
        }

        [Authorize]
        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult EditInfo([FromBody] UserEditDto userEditDto)
        {
            _userService.UpdateInfo(userEditDto);
            return NoContent();
        }

        [Authorize]
        [HttpGet("search")]
        public IActionResult SearchUsers([FromQuery] string name, [FromServices] IOptions<ApiBehaviorOptions> apiBehaviorOptions)
        {
            if (name is null || name.Length is < 3 or > 128)
            {
                ModelState.AddModelError("Name",
                    name is null ? "Nie podano nazwy." : $"Nazwa ma złą długość: {name.Length}.");
                return apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
            }
            
            var users = _userService.SearchUsers(name);
            return Ok(users);
        }
    }
}
