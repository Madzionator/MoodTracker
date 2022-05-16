using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using MoodTracker.API.Database.Models;
using MoodTracker.API.Interfaces;
using MoodTracker.API.Migrations;

namespace MoodTracker.API.Controllers
{
    public enum FollowAction
    {
        Follow,
        Unfollow,
        Revoke,
        Accept,
        Reject
    }

    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class FollowController : Controller
    {
        private readonly IFollowService _followService;

        public FollowController(IFollowService followService)
        {
            _followService = followService;
        }

        [HttpGet("waiting")]
        public IActionResult GetWeek()
        {
            var users = _followService.WaitingFollowes();
            return Ok(users);
        }

        [HttpPost("{userId}")]
        public IActionResult AddFollow([FromRoute] int userId, [FromQuery] FollowAction action)
        {
            Action<int> doAction = action switch
            {
                FollowAction.Follow => id => _followService.AddFollow(id),
                FollowAction.Unfollow => id => _followService.RemoveFollow(id),
                FollowAction.Revoke => id => _followService.RevokeFollower(id),
                FollowAction.Accept => id => _followService.AcceptFollow(id),
                FollowAction.Reject => id => _followService.RejectFollow(id),
                _ => throw new ArgumentOutOfRangeException(nameof(action), action, null)
            };

            doAction(userId);

            return NoContent();
        }
    }
}