using System;
using System.Collections.Generic;

namespace AppointmentSchedulingApp.Application.DTOs
{
    public class ResultDTO
    {
        public bool Succeeded { get; set; }
        public string Message { get; set; }
        public Dictionary<string, string[]> Errors { get; set; }

        public static ResultDTO Success(string message = "Thành công")
        {
            return new ResultDTO { 
                Succeeded = true,
                Message = message
            };
        }

        public static ResultDTO Failure(string message, params string[] errors)
        {
            var errorDict = new Dictionary<string, string[]>();
            if (errors.Length > 0)
            {
                errorDict.Add("General", errors);
            }

            return new ResultDTO
            {
                Succeeded = false,
                Message = message,
                Errors = errorDict
            };
        }

        public static ResultDTO Failure(string message, Dictionary<string, string[]> errors = null)
        {
            return new ResultDTO
            {
                Succeeded = false,
                Message = message,
                Errors = errors
            };
        }
    }
} 