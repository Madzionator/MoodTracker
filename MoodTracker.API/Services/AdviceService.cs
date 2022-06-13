using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MoodTracker.API.Database;
using MoodTracker.API.Database.Models;
using MoodTracker.API.DTO;
using MoodTracker.API.Exceptions;
using MoodTracker.API.Interfaces;

namespace MoodTracker.API.Services;
internal class AdviceService : IAdviceService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IUserInfoProvider _userInfoProvider;

    public AdviceService(DataContext context, IUserInfoProvider userInfoProvider, IMapper mapper)
    {
        _context = context;
        _userInfoProvider = userInfoProvider;
        _mapper = mapper;
    }

    public AdviceDto GetAdvice(int CategoryId)
    {
        return new AdviceDto() { CategoryId = CategoryId,
             Advice = _context.Advices
            .Where(a => a.CategoryId == CategoryId)
            .Select(ad => ad.Description).Single()
        };
    }
}