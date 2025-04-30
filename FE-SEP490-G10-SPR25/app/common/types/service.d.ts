interface IService {
  serviceId: string;
  serviceName: string;
  overview?: string;
  process?: string;
  treatmentTechniques?: string;
  price: number;
  estimatedTime?: string;
  isPrepayment?: boolean;
  specialtyId: number;
  image: string;
  rating?: number;
  ratingCount?: number;
}

interface IDoctorService {
  doctorId: number;
  doctorName: string;
  expertise: string;
  image?: string;
}

interface IRelatedDoctor {
  doctorId: number;
  academicTitle?: string;
  degree?: string;
  doctorName: string;
  expertise?: string;
  specialties?: string[];
  image?: string;
  rating?: number;
  ratingCount?: number;
}

interface IServiceDetail extends IService {
  specialtyName?: string;
  doctorServices?: IDoctorService[];
  relatedServices?: IService[];
  requiredDevices?: string[];
  relatedDoctors?: (string | IRelatedDoctor)[];
}

