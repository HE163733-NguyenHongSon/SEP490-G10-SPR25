interface IPatient extends Partial<IUser> {
  relationship: string;
  mainCondition?: string;
  rank?: string;
  guardianId?: string;
}
