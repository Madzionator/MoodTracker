using MoodTracker.API.Interfaces;
using MoodTracker.API.Services;

namespace MoodTracker.API.Infrastructure;

public static class InterfaceRegistry
{
    public static IServiceCollection RegisterInterfaces(this IServiceCollection services)
    {
        return services
            .AddScoped<IUserService, UserService>()
            .AddScoped<IMoodService, MoodService>()
            .AddScoped<IHashService, HashService>()
            .AddScoped<IFollowService, FollowService>()
            .AddScoped<IAdviceService, AdviceService>()
            .AddScoped<IUserCategoryService, UserCategoryService>()
            .AddScoped<IUserInfoProvider, UserInfoProvider>()
            .AddScoped<ErrorHandlingMiddleware>()
            .AddScoped<IMailer, Mailer>()
            .AddSingleton<IAuthManager, AuthManager>()
            .AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
    }

}