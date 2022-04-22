using AutoMapper;
using MoodTracker.API.Database;
using MoodTracker.API.Database.Models;
using MoodTracker.API.DTO;
using MoodTracker.API.Exceptions;
using MoodTracker.API.Interfaces;

namespace MoodTracker.API.Services;

internal class CategoryService : ICategoryService
{
    private readonly DataContext _context;
    private readonly IUserInfoProvider _userInfoProvider;

    public CategoryService(DataContext context, IUserInfoProvider userInfoProvider)
    {
        _userInfoProvider = userInfoProvider;
        _context = context;
    }

    public void AddCategory(List<int> catId)
    {
        var userId = _userInfoProvider.Id;
        if (userId == null)
        {
            throw new UserIdNotFoundException();
        }

        var categories = _context.Categories
            .Where(x => x.UserId == userId)
            .Select(c => c.CategoryId)
            .ToList();

        var catg = new Category();
        foreach (var item in catId)
        {
            if (categories.Contains(item))
                continue;
            catg.CategoryId = item;
            catg.UserId = (int)userId;
            _context.Categories.Add(catg); 
        }
        _context.SaveChanges();
    }

    public List<int> GetCategories()
    {
        var userId = _userInfoProvider.Id;
        if (userId == null)
        {
            throw new UserIdNotFoundException();
        }

        var categories = _context.Categories
            .Where(c => c.UserId == userId)
            .Select(c => c.CategoryId)
            .ToList();

        return categories;
    }
}