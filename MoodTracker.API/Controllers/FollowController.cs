using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    public enum GetFollowList
    {
        Waiting,
        Following,
        Followers
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

        [HttpGet]
        public IActionResult GetFollows([FromQuery] GetFollowList list)
        {
            var users = list switch
                {
                    GetFollowList.Waiting => _followService.WaitingFollowers(),
                    GetFollowList.Following => _followService.Following(),
                    GetFollowList.Followers => _followService.Followers(),
                        _ => throw new ArgumentOutOfRangeException(nameof(list), list, null)
                };

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
                FollowAction.Reject => id => _followService.RevokeFollower(id),
                _ => throw new ArgumentOutOfRangeException(nameof(action), action, null)
            };

            doAction(userId);

            return NoContent();
        }

        [HttpGet("status/{userId}")] 
        public IActionResult GetStates([FromRoute] int userId)
        {
            var states = _followService.GetStatus(userId);
            return Ok(states);
        }
    }
}