export interface IDoctor {
   doctorId: number;
   academicTitle: string;
   degree: string;
   doctorName: string;
   avatarUrl: string;
   currentWork?: string;
   basicDescription: string;
   specialtyNames: string[];
   numberOfService: number;
   numberOfExamination: number;
   rating: number;
   ratingCount: number;
}

export interface DoctorDetailDTO extends IDoctor {
  detailDescription: string;
  workExperience?: string;
  organization?: string;
  prize?: string;
  researchProject?: string;
  trainingProcess?: string;
  experienceYear?: number;
  schedules?: any[];
  services?: any[];
  feedbacks?: any[];
  relevantDoctors?: any[];
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