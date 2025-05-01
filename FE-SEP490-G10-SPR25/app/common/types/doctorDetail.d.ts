interface IDoctorDetailDTO extends IDoctor {
    workExperience?: string;
    organization?: string;
    prize?: string;
    researchProject?: string;
    trainingProcess?: string;
    schedules: IDoctorSchedule[];
    services: ISeries[];
    feedbacks: IFeedback[];
    relevantDoctors: IDoctor[];
    
  }