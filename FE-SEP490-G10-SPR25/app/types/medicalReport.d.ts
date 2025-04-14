export interface IMedicalReport {
  patient: IUser;
  numberOfVisits: number;
  firstVisitFormatted: string;
  lastVisitFormatted: string;
  mainCondition: string;
  medicalRecords: IMedicalRecord[];
}
