using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MoodTracker.API.Database.Models;

[DebuggerDisplay("Follow: {FollowerId} -> {FollowedUserId}")]
public class Follow
{
    public int FollowerId { get; set; }
    public User Follower { get; set; }
    public int FollowedUserId { get; set; }
    public User FollowedUser { get; set; }
    public bool IsAccepted { get; set; }
    public bool IsFavourite { get; set; }
}

public class FollowConfig : IEntityTypeConfiguration<Follow>
{
    public void Configure(EntityTypeBuilder<Follow> follow)
    {
        follow.HasKey(x => new { x.FollowerId, x.FollowedUserId });
    }
} 