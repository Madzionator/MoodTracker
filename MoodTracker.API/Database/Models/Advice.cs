using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MoodTracker.API.Database.Models;

public class Advice
{
    public int Id { get; set; }
    public string Description { get; set; }
    public int CategoryId { get; set; }
}

public class AdviceConfiguration : IEntityTypeConfiguration<Advice>
{
    public void Configure(EntityTypeBuilder<Advice> advice)
    {
        advice.HasKey(x => x.Id)
            .IsClustered(true);

        advice.Property(x => x.Description)
            .IsRequired()
            .HasMaxLength(512);

        advice.Property(x => x.CategoryId)
            .IsRequired();
    }
}