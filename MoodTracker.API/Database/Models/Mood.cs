using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MoodTracker.API.Database.Models;

public class Mood
{
    public int Id { get; set; }
    public DateTime DateTime { get; set; }
    public int CategoryId { get; set; }
    public int Value { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }
}

public class MoodConfiguration : IEntityTypeConfiguration<Mood>
{
    public void Configure(EntityTypeBuilder<Mood> mood)
    {
        mood.HasKey(x => x.Id)
            .IsClustered(false);

        mood.Property(x => x.DateTime)
            .IsRequired();

        mood.Property(x => x.CategoryId)
            .IsRequired();

        mood.Property(x => x.Value)
            .IsRequired();

        mood.Property(x => x.UserId)
            .IsRequired();
    }
}