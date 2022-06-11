using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoodTracker.API.DTO;
using MoodTracker.API.Interfaces;

namespace MoodTracker.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class AdviceController : Controller
    {
        private readonly IAdviceService _adviceService;

        public AdviceController(IAdviceService adviceService)
        {
            _adviceService = adviceService;
        }

        [HttpGet]
        public string GetAdvice(int CategoryId)
        {
            return _adviceService.GetAdvice(CategoryId);
        }

    }
}
