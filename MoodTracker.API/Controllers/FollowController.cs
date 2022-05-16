using Microsoft.AspNetCore.Mvc;
using MoodTracker.API.Interfaces;

namespace MoodTracker.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FollowController : Controller
    {
        private readonly IFollowService _categoryService;

        public FollowController(IFollowService followService)
        {
            _categoryService = followService;
        }
    }
}