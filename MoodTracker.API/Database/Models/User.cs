﻿using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MoodTracker.API.Database.Models;

[DebuggerDisplay("User: {Id} {UserName}")]
public class User : ICreatedAt, IModifiedAt
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string EmailAddress { get; set; }
    public string Password { get; set; }
    public string? Bio { get; set; }
    public bool IsPrivate { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? ModifiedAt { get; set; }
    public ICollection<Mood> Moods { get; set; }
    public ICollection<UserCategory> Categories { get; set; }
    public ICollection<Follow> FollowedMe { get; set; }
    public ICollection<Follow> FollowedByMe { get; set; }
}

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> user)
    {
        user.HasKey(x => x.Id)
            .IsClustered(true);

        user.Property(x => x.UserName)
            .IsRequired()
            .HasMaxLength(128);

        user.Property(x => x.EmailAddress)
            .IsRequired()
            .HasMaxLength(128);

        user.Property(x => x.Password)
            .IsRequired()
            .HasMaxLength(512);

        user.Property(x => x.Bio)
            .HasMaxLength(512);

        user.Property(x => x.IsPrivate)
            .IsRequired()
            .HasDefaultValue(false);

        user.HasMany(x => x.FollowedByMe)
            .WithOne(x => x.Follower)
            .HasForeignKey(x => x.FollowerId)
            .OnDelete(DeleteBehavior.ClientCascade);

        user.HasMany(x => x.FollowedMe)
            .WithOne(x => x.FollowedUser)
            .HasForeignKey(x => x.FollowedUserId)
            .OnDelete(DeleteBehavior.ClientCascade);
    }
}