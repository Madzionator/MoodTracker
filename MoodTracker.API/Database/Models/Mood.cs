using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MoodTracker.API.Database.Models;

public class Mood
{
    public int Id { get; set; }
    public DateTime DateTime { get; set; }

    public int? Study { get; set; }

    public int? Family { get; set; }

    public int? Hobby { get; set; }

    public int UserId { get; set; }

    public User User { get; set; }
}

/*
public class MoodConfiguration : IEntityTypeConfiguration<Mood>
{
    public void Configure(EntityTypeBuilder<Mood> mood)
    {
        mood.HasKey(x => x.Id).IsClustered(false);

        mood.Property(x => x.DateTime).IsRequired();

        mood.Property(x => x.UserId).IsRequired();
    }
}
*/