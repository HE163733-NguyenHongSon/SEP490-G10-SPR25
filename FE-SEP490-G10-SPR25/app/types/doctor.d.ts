export interface IDoctor {
   doctorId: number ;
   academicTitle?: string;
   degree: string;
   doctorName: string;
   avatarUrl:string;
   currentWork?: string;
   basicDescription: string;
   specialtyNames: string[];
   numberOfService: number;
   rating: number ;
   numberOfExamination: number;
   experienceYear:number;
   userName?: string;
   password?: string;
   citizenId?: number;
   phone?: string;
   gender?: string;
   dateOfBirth?: Date | string;
   address?: string;
}

export interface IDoctorDetail extends IDoctor {
  detailDescription: string;
  workExperience?: string;
  organization?: string;
  prize?: string;
  researchProject?: string;
  trainingProcess?: string;
}

export interface DoctorDetailDTO extends IDoctorDetail {}