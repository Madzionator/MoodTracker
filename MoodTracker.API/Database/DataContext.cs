using Microsoft.EntityFrameworkCore;
using MoodTracker.API.Database.Models;

namespace MoodTracker.API.Database;

public class DataContext : DbContext
{
    public DbSet<User> Users { get; set; }

    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
    }
}