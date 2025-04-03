using AutoMapper;
using System;

namespace AppointmentSchedulingApp.Application.Profiles
{
    /// <summary>
    /// Custom converter from string to TimeOnly?
    /// </summary>
    public class StringToTimeOnlyConverter : IValueConverter<string, TimeOnly?>
    {
        public TimeOnly? Convert(string sourceMember, ResolutionContext context)
        {
            if (string.IsNullOrEmpty(sourceMember))
                return null;
            
            // Try regular time parsing first
            if (TimeOnly.TryParse(sourceMember, out TimeOnly result))
                return result;
            
            // Extract digits from string like "30 minutes"
            string numericPart = new string(sourceMember.Where(char.IsDigit).ToArray());
            if (int.TryParse(numericPart, out int minutes))
            {
                return new TimeOnly(minutes / 60, minutes % 60);
            }
            
            return null;
        }
    }

  /// <summary>
  /// Custom converter from TimeOnly? to string
  /// </summary>
    public class TimeOnlyToStringConverter : IValueConverter<TimeOnly?, string>
    {
        public string Convert(TimeOnly? sourceMember, ResolutionContext context)
        {
            if (!sourceMember.HasValue)
                return null;
            
            var time = sourceMember.Value;
            int totalMinutes = time.Hour * 60 + time.Minute;
            return $"{totalMinutes} minutes";
        }
    }
} 