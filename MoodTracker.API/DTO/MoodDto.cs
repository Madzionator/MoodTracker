namespace MoodTracker.API.DTO;
public class MoodDto
{
    public DateTime DateTime { get; set; }
    public int CategoryId { get; set; }
    public int Value { get; set; }
}

public class MoodAddDto
{
    private DateTime _dt;
    public DateTime DateTime { get => _dt; set => _dt = value.Date; }
    public IList<MoodValueDto> Values { get; set; }
}

public class MoodValueDto
{
    public int CategoryId { get; set; }
    public int Value { get; set; }
}

public class MoodWeekDto
{
    public int CategoryId { get; set; }
    public List<int?> Values { get; set; }
}

public class MoodFollowersDto
{
    public int FollowedId { get; set; }
    public List<MoodWeekDto> FollowerValues { get; set; }
}