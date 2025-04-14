export interface IDoctor extends IUser {
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
  schedules: any[];
  services: any[];
  feedbacks: any[];
  relevantDoctors: IDoctor[];
  dateOfBirth?: Date | string;
  password?: string;
  userName?: string;
  email?: string;
  citizenId?: string | number;
  phone?: string;
  gender?: string;
  address?: string;
}

