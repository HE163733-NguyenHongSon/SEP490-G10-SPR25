using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class ResultDTO
    {
        public bool Succeeded { get; set; }
        public string[] Errors { get; set; }

        public static ResultDTO Success()
        {
            return new ResultDTO { Succeeded = true };
        }

        public static ResultDTO Failure(params string[] errors)
        {
            return new ResultDTO
            {
                Succeeded = false,
                Errors = errors
            };
        }
    }
} 