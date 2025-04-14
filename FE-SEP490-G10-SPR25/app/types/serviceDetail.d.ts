interface IServiceDetail extends IService {
    specialtyName?: string;
    doctorServices?: {
      doctorId: number;
      doctorName: string;
      expertise: string;
      image?: string;
    }[];
    relatedServices?: IService[];
  }
  