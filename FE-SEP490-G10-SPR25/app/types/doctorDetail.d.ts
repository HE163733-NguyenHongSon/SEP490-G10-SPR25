
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
}
