using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MoodTracker.API.Database.Models;

public class Category
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public int CategoryId { get; set; }
}

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> category)
    {
        category.HasKey(x => x.Id)
            .IsClustered(false);
        category.Property(x => x.UserId)
            .IsRequired();
        category.Property(x => x.CategoryId)
            .IsRequired();
    }
}