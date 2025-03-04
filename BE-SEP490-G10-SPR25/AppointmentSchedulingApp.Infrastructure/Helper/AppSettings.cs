namespace AppointmentSchedulingApp.Infrastructure.Helper
{
    public class AppSettings
    {
        public string SecretKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int ExpiryInDays { get; set; }

    }
}
