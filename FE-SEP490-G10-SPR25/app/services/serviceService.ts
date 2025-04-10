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

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Services`;

export const serviceService = {

    getNumberOfServices: async (): Promise<number> => {
        try {
            const response = await fetch(`http://localhost:5220/odata/Services/$count`);
            return response.json();
        } catch (error) {
            console.error('Error fetching services:', error);
            throw error;
        }
    },
    getAllServices: async (): Promise<Service[]> => {
        try {
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            console.error('Error fetching services:', error);
            throw error;
        }
    },

    getServiceById: async (id: number): Promise<Service> => {
        try {
            const response = await axios.get(`${apiUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching service with ID ${id}:`, error);
            throw error;
        }
    },

    getServiceDetailById: async (id: number): Promise<ServiceDetail> => {
        try {
            // Set timeout to 10 seconds to avoid long waiting time
            const response = await axios.get(`${apiUrl}/details/${id}`, {
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
            const response = await axios.post(apiUrl, serviceData);
            return response.data;
        } catch (error) {
            console.error('Error creating service:', error);
            throw error;
        }
    },

    updateService: async (serviceData: ServiceUpdateDTO): Promise<Service> => {
        try {
            const response = await axios.put(`${apiUrl}/${serviceData.serviceId}`, serviceData);
            return response.data;
        } catch (error) {
            console.error(`Error updating service with ID ${serviceData.serviceId}:`, error);
            throw error;
        }
    },

    deleteService: async (id: number): Promise<void> => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
        } catch (error) {
            console.error(`Error deleting service with ID ${id}:`, error);
            throw error;
        }
    },

    getServicesBySpecialty: async (specialtyId: number): Promise<Service[]> => {
        try {
            const response = await axios.get(`${apiUrl}/specialty/${specialtyId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching services for specialty ID ${specialtyId}:`, error);
            throw error;
        }
    },

    getServicesByCategory: async (categoryId: number): Promise<Service[]> => {
        try {
            const response = await axios.get(`${apiUrl}/category/${categoryId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching services for category ID ${categoryId}:`, error);
            throw error;
        }
    },

    getServicesSortedByRating: async (): Promise<Service[]> => {
        try {
            const response = await axios.get(`${apiUrl}/sort/rating`);
            return response.data;
        } catch (error) {
            console.error('Error fetching services sorted by rating:', error);
            throw error;
        }
    }
}; 