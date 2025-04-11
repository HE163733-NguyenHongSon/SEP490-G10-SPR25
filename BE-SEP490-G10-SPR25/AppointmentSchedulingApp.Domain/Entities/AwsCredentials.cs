using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Domain.Entities
{
    public class AwsCredentials
    {
        public string AwsKey { get; set; } = "";
        public string AwsSecretKey { get; set; } = "";
    }
}
