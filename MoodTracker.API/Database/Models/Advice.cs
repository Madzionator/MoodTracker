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

        advice.HasData(new Advice {Id = 1, CategoryId = 1, Description = "Porada do pracy" },
                       new Advice { Id = 2, CategoryId = 2, Description = "Porada do hobby" },
                       new Advice { Id = 3, CategoryId = 3, Description = "Porada do rodziny" },
                       new Advice { Id = 4, CategoryId = 4, Description = "Porada do przyjaciół" },
                       new Advice { Id = 5, CategoryId = 5, Description = "Porada do lifestyle" },
                       new Advice { Id = 6, CategoryId = 6, Description = "Porada do samorealizacji" },
                       new Advice { Id = 7, CategoryId = 7, Description = "Porada do zdrowia" });
    }
}