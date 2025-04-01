﻿using AppointmentSchedulingApp.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentSchedulingApp.Application.IServices
{
    public interface IMedicalReportService
    {
        public Task<MedicalReportDTO> GetMedicalReportByPatientId(int patientId);
    }
}
