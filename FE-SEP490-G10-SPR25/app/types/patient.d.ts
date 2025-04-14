export interface IPatient extends IUser {
    relationship: string;
    mainCondition: string;
    rank: string;
  }