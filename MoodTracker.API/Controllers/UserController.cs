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
        private readonly IUserInfoProvider _userInfoProvider;

        public UserController(IUserService userService, IUserInfoProvider userInfoProvider)
        {
            _userService = userService;
            _userInfoProvider = userInfoProvider;
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
        [Authorize] // wymóg zalogowania
        [HttpGet("test")]
        public IActionResult Test()
        {
            var user = _userInfoProvider.CurrentUser; // pozyskiwanie użytkownika z tokenu
            return Ok($"Potwierdzono logowanie na konto '{user.UserName}' :D");
        }
    }
}
