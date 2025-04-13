export interface ServiceDTO {
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

export interface ServiceDetailDTO extends ServiceDTO {
  specialtyName?: string;
  doctorServices?: {
    doctorId: number;
    doctorName: string;
    expertise: string;
    image?: string;
  }[];
  relatedServices?: ServiceDTO[];
} 