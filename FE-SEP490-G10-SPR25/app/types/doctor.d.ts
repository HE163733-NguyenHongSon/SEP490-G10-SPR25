 interface IDoctor {
   doctorId: number ;
   academicTitle: string;
   degree: string;
   doctorName: string;
   avatarUrl:string;
   currentWork?: string;
   basicDescription: string;
   specialtyNames: string[];
   numberOfService: number;
   numberOfExamination: number;
 }  