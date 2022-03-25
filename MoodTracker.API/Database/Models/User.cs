using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MoodTracker.API.Database.Models;

public class User : ICreatedAt, IModifiedAt
{
    public Guid Id { get; set; }
    public string UserName { get; set; }
    public string EmailAddress { get; set; }
    public string Password { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? ModifiedAt { get; set; }
}

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> user)
    {
        user.HasKey(x => x.Id)
            .IsClustered(false);

        user.Property(x => x.UserName)
            .IsRequired()
            .HasMaxLength(128);

        user.Property(x => x.EmailAddress)
            .IsRequired()
            .HasMaxLength(128);

        user.Property(x => x.Password)
            .IsRequired()
            .HasMaxLength(512);
    }
}