using Microsoft.EntityFrameworkCore;
using MoodTracker.API;
using MoodTracker.API.Controllers;
using MoodTracker.API.Database;
using MoodTracker.API.DTO;
using MoodTracker.API.Infrastructure;
using MoodTracker.API.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithValidations();
builder.Services.AddAutoMapper(typeof(MapperConfiguration).Assembly);
builder.Services.AddSwagger();

builder.Services.RegisterInterfaces();

var connectionString = builder.Configuration.GetConnectionString("db");
builder.Services.AddDbContext<DataContext>(x => x.UseSqlServer(connectionString));
builder.Services.AddHostedService<DbMigrator>();

var authOptions = builder.Configuration.GetOptions<AuthOptions>("Auth");
builder.Services.AddAuth(authOptions);

var app = builder.Build();

if (!app.Environment.IsDevelopment())
    app.UseHttpsRedirection();

app.UseSwaggerDocs();
app.UseAuth();

app.MapGet("/", ctx => ctx.Response.WriteAsync($"MoodTracker API {DateTime.Now}"));

app.UseMiddleware<ErrorHandlingMiddleware>();
app.MapControllers();

app.Run();