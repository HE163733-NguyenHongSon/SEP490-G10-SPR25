interface IDoctorDetail extends IDoctor {
  detailDescription: string;
  workExperience?: string;
  organization?: string;
  prize?: string;
  researchProject?: string;
  trainingProcess?: string;
  schedules: IDoctorSchedule[];
  services: IService[];
  feedbacks: IFeedback[];
  relevantDoctors: IDoctor[];
}
