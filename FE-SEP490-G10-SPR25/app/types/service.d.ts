export interface IService {
  serviceId: number;
  serviceName: string;
  overview?: string;
  process?: string;
  treatmentTechniques?: string;
  price: number;
  estimatedTime?: string;
  isPrepayment?: boolean;
  specialtyId: number;
  image?: string;
  rating?: number;
  ratingCount?: number;
}
export interface IServiceDetail extends IService {
  specialtyName?: string;
  doctorServices?: {
    doctorId: number;
    doctorName: string;
    expertise: string;
    image?: string;
  }[];
  relatedServices?: IService[];
  requiredDevices?: string[];
  relatedDoctors?: (string | {
    doctorId: number;
    academicTitle?: string;
    degree?: string;
    doctorName: string;
    [key: string]: any;
  })[];
}

