 interface IDoctor extends IUser {
  academicTitle: string;
  degree: string;
  currentWork?: string;
  doctorDescription: string;
  specialtyNames: string[];
  numberOfService: number;
  numberOfExamination: number;
  rating: number;
  ratingCount: number;
}



