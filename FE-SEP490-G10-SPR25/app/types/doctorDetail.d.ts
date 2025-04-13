interface IDoctorDetail extends IDoctor {
  detailDescription: string;
  workExperience?: string;
  organization?: string;
  prize?: string;
  researchProject?: string;
  trainingProcess?: string;
  schedules: IDoctorSchedule[];
  services: ServiceDTO[];
  feedbacks: IFeedback[];
  relevantDoctors: IDoctor[];
  
  // User fields
  email?: string;
  userName?: string;
  password?: string;
  citizenId?: string | number;
  phone?: string;
  gender?: string;
  dateOfBirth?: string | Date;
  address?: string;
}
