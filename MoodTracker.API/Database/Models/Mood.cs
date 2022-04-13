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

//category: 1-7
// 1 praca / studia,
// 2 hobby,
// 3 rodzina,
// 4 przyjaciele,
// 5 lifestyle,
// 6 samorealizacja
// 7 zdrowie
// 

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