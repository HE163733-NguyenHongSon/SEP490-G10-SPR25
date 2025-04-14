import { ISeries } from "@react-jvectormap/core/dist/types";
import { IFeedback } from "./feedback";

 interface IDoctor extends IUser {
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

 interface IDoctorDetailDTO extends IDoctor {
  detailDescription: string;
  workExperience?: string;
  organization?: string;
  prize?: string;
  researchProject?: string;
  trainingProcess?: string;
  schedules: IDoctorSchedule[];
  services: ISeries[];
  feedbacks: IFeedback[];
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

