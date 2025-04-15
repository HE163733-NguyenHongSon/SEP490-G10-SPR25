interface IDashboardAdmin {
    totalAppointmentSchedule: number;
    totalPatient: number;
    totalDoctor: number;
    totalService: number;
    appointmentScheduleChangePercent: number;
    patientChangePercent: number;

    todayTotal : number;
    monthTotal : number;
    lastMonthTotal : number;
    percentChange : number;
    target : number;
  }