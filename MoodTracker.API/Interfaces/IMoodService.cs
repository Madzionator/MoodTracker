﻿using MoodTracker.API.DTO;

namespace MoodTracker.API.Interfaces;

public interface IMoodService
{
    void AddMood(MoodDto dto, int? userId);
}

