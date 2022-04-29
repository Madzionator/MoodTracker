using AutoMapper;
using MoodTracker.API.Database;
using MoodTracker.API.Database.Models;
using MoodTracker.API.DTO;
using MoodTracker.API.Exceptions;
using MoodTracker.API.Interfaces;

namespace MoodTracker.API.Services;

internal class UserCategoryService : IUserCategoryService
{
    private readonly DataContext _context;
    private readonly IUserInfoProvider _userInfoProvider;

    public UserCategoryService(DataContext context, IUserInfoProvider userInfoProvider)
    {
        _userInfoProvider = userInfoProvider;
        _context = context;
    }

    public void AddCategory(List<int> dto)
    {
        var userId = _userInfoProvider.Id;
        if (userId == null)
        {
            throw new UserIdNotFoundException();
        }

        var categories = _context.UserCategories
            .Where(x => x.UserId == userId)
            .Select(c => c.CategoryId)
            .ToList();

        foreach (var item in dto.Where(item => !categories.Contains(item)))
            _context.UserCategories.Add(new UserCategory() { CategoryId = item, UserId = (int)userId });

        foreach (var del in from cat in categories
                            where !dto.Contains(cat)
                            select _context.UserCategories.First(x => x.UserId == userId && x.CategoryId == cat))
            _context.UserCategories.Remove(del);

        _context.SaveChanges();
    }

    public List<int> GetCategories()
    {
        var userId = _userInfoProvider.Id;
        if (userId == null)
        {
            throw new UserIdNotFoundException();
        }

        var categories = _context.UserCategories
            .Where(c => c.UserId == userId)
            .Select(c => c.CategoryId)
            .ToList();

        return categories;
    }
}