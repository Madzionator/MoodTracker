using MoodTracker.API.Exceptions;

namespace MoodTracker.API.Infrastructure;

public class ErrorHandlingMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next.Invoke(context);
        }
        catch (ProjectException exception)
        {
            context.Response.StatusCode = exception.ErrorCode;
            await context.Response.WriteAsJsonAsync(new { Error = exception.Message });

        }
        catch (Exception)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(new { Error = "Błąd serwera" });
        }
    }
}

