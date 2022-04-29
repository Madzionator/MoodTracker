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
            .AddScoped<IUserCategoryService, UserCategoryService>()
            .AddScoped<IUserInfoProvider, UserInfoProvider>()
            .AddScoped<ErrorHandlingMiddleware>()
            .AddSingleton<IAuthManager, AuthManager>()
            .AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
    }

}