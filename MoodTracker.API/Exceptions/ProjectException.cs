﻿using System.Net;

namespace MoodTracker.API.Exceptions;
public class ProjectException : Exception
{
    public HttpStatusCode ErrorCode { get; }

    public ProjectException(string message, HttpStatusCode errorCode = HttpStatusCode.BadRequest) : base(message)
    {
        ErrorCode = errorCode;
    }
}
