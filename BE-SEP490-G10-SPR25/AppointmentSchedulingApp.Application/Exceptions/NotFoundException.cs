using System;

namespace AppointmentSchedulingApp.Application.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string message) 
            : base(message)
        {
        }
    }
} 