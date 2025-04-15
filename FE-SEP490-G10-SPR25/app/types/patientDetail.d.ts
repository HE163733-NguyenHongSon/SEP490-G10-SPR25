 interface IPatientDetail extends IPatient {
  guardian?: IUser;
  dependents?: IPatient[];
  medicalRecords?: IMedicalRecord[];
  relationship?: string;
}
