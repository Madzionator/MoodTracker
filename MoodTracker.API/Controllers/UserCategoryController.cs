using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoodTracker.API.Interfaces;

namespace MoodTracker.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserCategoryController : Controller
    {
        private readonly IUserCategoryService _categoryService;

        public UserCategoryController(IUserCategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [Authorize]
        [HttpPost]
        public IActionResult AddCategory([FromBody] List<int> dto)
        {
            _categoryService.AddCategory(dto);
            return NoContent();
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetCategories()
        {
            var categories = _categoryService.GetCategories();
            return Ok(categories);
        }
    }
}