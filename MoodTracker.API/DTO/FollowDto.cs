using FluentValidation;

namespace MoodTracker.API.DTO;

public class FollowStatusDto
{
    public bool IsFollower { get; set; }
    public bool IsFollowing { get; set; }
    public bool IsAsked { get; set; }
}
