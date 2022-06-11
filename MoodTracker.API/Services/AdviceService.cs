using MoodTracker.API.Database;
using MoodTracker.API.Database.Models;
using MoodTracker.API.DTO;
using MoodTracker.API.Exceptions;
using MoodTracker.API.Interfaces;

namespace MoodTracker.API.Services;
internal class AdviceService : IAdviceService
{
    private readonly DataContext _context;
    private readonly IUserInfoProvider _userInfoProvider;

    public AdviceService(DataContext context, IUserInfoProvider userInfoProvider)
    {
        _context = context;
        _userInfoProvider = userInfoProvider;
    }

    public string GetAdvice(int CategoryId)
    {
        var advice = _context.Advices
            .Where(a => a.CategoryId == CategoryId)
            .Select(ad => ad.Description).Single();
        return advice;
    }
}