import axios from 'axios';

export interface Service {
    serviceId: number;
    serviceName: string;
    overview: string;
    process: string;
    treatmentTechniques: string;
    price: number;
    image: string;
    specialtyId: number;
    estimatedTime?: string;
    rating?: number;
    ratingCount?: number;
    isPrepayment?: boolean;
}

export interface ServiceDetail extends Service {
    specialtyName: string;
    relatedDoctors: string[];
    requiredDevices: string[];
}

export interface ServiceCreateDTO {
    serviceName: string;
    overview: string;
    process: string;
    treatmentTechniques: string;
    price: number;
    image: string;
    specialtyId: number;
    isPrepayment?: boolean;
    estimatedTime?: string;
}

export interface ServiceUpdateDTO extends ServiceCreateDTO {
    serviceId: number;
}

const SERVICE_API_URL = 'http://localhost:5220/api/Services';

export const serviceService = {
    getAllServices: async (): Promise<Service[]> => {
        try {
            const response = await axios.get(SERVICE_API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching services:', error);
            throw error;
        }
    },

    getServiceById: async (id: number): Promise<Service> => {
        try {
            const response = await axios.get(`${SERVICE_API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching service with ID ${id}:`, error);
            throw error;
        }
    },

    getServiceDetailById: async (id: number): Promise<ServiceDetail> => {
        try {
            // Set timeout to 10 seconds to avoid long waiting time
            const response = await axios.get(`${SERVICE_API_URL}/details/${id}`, {
                timeout: 10000
            });
            return response.data;
        } catch (error: unknown) {
            console.error(`Error fetching service detail with ID ${id}:`, error);
            
            // Provide more detailed error messages
            if (axios.isAxiosError(error) && error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status === 404) {
                    throw new Error(`Service with ID ${id} not found`);
                } else {
                    throw new Error(`Server error: ${error.response.status} ${error.response.statusText}`);
                }
            } else if (axios.isAxiosError(error) && error.request) {
                // The request was made but no response was received
                throw new Error('No response from server. Please check your connection and try again.');
            } else {
                // Something else caused the error
                throw new Error(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
            }
        }
    },

    createService: async (serviceData: ServiceCreateDTO): Promise<Service> => {
        try {
            const response = await axios.post(SERVICE_API_URL, serviceData);
            return response.data;
        } catch (error) {
            console.error('Error creating service:', error);
            throw error;
        }
    },

    updateService: async (serviceData: ServiceUpdateDTO): Promise<Service> => {
        try {
            const response = await axios.put(`${SERVICE_API_URL}/${serviceData.serviceId}`, serviceData);
            return response.data;
        } catch (error) {
            console.error(`Error updating service with ID ${serviceData.serviceId}:`, error);
            throw error;
        }
    },

    deleteService: async (id: number): Promise<void> => {
        try {
            await axios.delete(`${SERVICE_API_URL}/${id}`);
        } catch (error) {
            console.error(`Error deleting service with ID ${id}:`, error);
            throw error;
        }
    },

    getServicesBySpecialty: async (specialtyId: number): Promise<Service[]> => {
        try {
            const response = await axios.get(`${SERVICE_API_URL}/specialty/${specialtyId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching services for specialty ID ${specialtyId}:`, error);
            throw error;
        }
    },

    getServicesByCategory: async (categoryId: number): Promise<Service[]> => {
        try {
            const response = await axios.get(`${SERVICE_API_URL}/category/${categoryId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching services for category ID ${categoryId}:`, error);
            throw error;
        }
    },

    getServicesSortedByRating: async (): Promise<Service[]> => {
        try {
            const response = await axios.get(`${SERVICE_API_URL}/sort/rating`);
            return response.data;
        } catch (error) {
            console.error('Error fetching services sorted by rating:', error);
            throw error;
        }
    }
}; 