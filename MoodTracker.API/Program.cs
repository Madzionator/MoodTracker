using Microsoft.EntityFrameworkCore;
using MoodTracker.API.Database;
using MoodTracker.API.DTO;
using MoodTracker.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("db");
builder.Services.AddDbContext<DataContext>(x => x.UseSqlServer(connectionString));
builder.Services.AddHostedService<DbMigrator>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddAutoMapper(typeof(MapperConfiguration).Assembly);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

if (!app.Environment.IsDevelopment())
{
    // Configure the HTTP request pipeline.
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapGet("/", ctx => ctx.Response.WriteAsync($"MoodTracker API {DateTime.Now}"));
app.MapControllers();

app.Run();
