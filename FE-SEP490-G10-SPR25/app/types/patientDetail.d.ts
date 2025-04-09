interface IPatientDetail extends IPatient {
  guardian: IGuardian;
  dependents: IPatient[];
  medicalRecords: IMedicalRecord[];
}
