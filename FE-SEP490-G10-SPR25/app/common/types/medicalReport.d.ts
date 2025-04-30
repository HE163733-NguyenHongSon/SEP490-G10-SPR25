interface IMedicalReport {
  patient: IPatient;
  numberOfVisits: number;
  firstVisitFormatted: string;
  lastVisitFormatted: string;
  medicalRecords: IMedicalRecord[];
}
