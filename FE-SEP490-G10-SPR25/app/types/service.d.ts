interface IService {
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

