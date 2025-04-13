import axios from 'axios';
import { ServiceDTO, ServiceDetailDTO } from '../types/service';

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

// Hiển thị URL đang sử dụng để debug
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Services`;
console.log('Service API URL:', apiUrl);

// Fallback URL trong trường hợp env không khả dụng
const fallbackUrl = 'http://localhost:5220/api/Services';

export const serviceService = {
    getNumberOfServices: async (): Promise<number> => {
        try {
            // Sử dụng API URL từ env hoặc fallback
            const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5220'}/odata/Services/$count`;
            console.log('Fetching count from:', url);
            const response = await fetch(url, { 
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                cache: 'no-store'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            return response.json();
        } catch (error) {
            console.error('Error fetching services count:', error);
            return 0; // Trả về 0 thay vì throw lỗi
        }
    },

    getAllServices: async (): Promise<ServiceDTO[]> => {
        try {
            // Sử dụng API URL từ env hoặc fallback
            const url = apiUrl || fallbackUrl;
            console.log('Fetching all services from:', url);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                cache: 'no-store'
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log(`Successfully retrieved ${data.length} services`);
            return data;
        } catch (error) {
            console.error('Error fetching services:', error);
            // Trả về mảng rỗng để tránh crash UI
            return [];
        }
    },

    getServiceById: async (id: number): Promise<ServiceDTO> => {
        try {
            const response = await axios.get(`${apiUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching service with ID ${id}:`, error);
            throw error;
        }
    },

    getServiceDetailById: async (id: number): Promise<ServiceDetailDTO> => {
        try {
            const response = await axios.get(`${apiUrl}/details/${id}`, {
                timeout: 10000
            });
            return response.data;
        } catch (error: unknown) {
            console.error(`Error fetching service detail with ID ${id}:`, error);
            
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 404) {
                    throw new Error(`Service with ID ${id} not found`);
                } else {
                    throw new Error(`Server error: ${error.response.status} ${error.response.statusText}`);
                }
            } else if (axios.isAxiosError(error) && error.request) {
                throw new Error('No response from server. Please check your connection and try again.');
            } else {
                throw new Error(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
            }
        }
    },

    createService: async (serviceData: ServiceCreateDTO): Promise<ServiceDTO> => {
        try {
            const response = await axios.post(apiUrl, serviceData);
            return response.data;
        } catch (error) {
            console.error('Error creating service:', error);
            throw error;
        }
    },

    updateService: async (serviceData: ServiceUpdateDTO): Promise<ServiceDTO> => {
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

    getServicesBySpecialty: async (specialtyId: number): Promise<ServiceDTO[]> => {
        try {
            const response = await axios.get(`${apiUrl}/specialty/${specialtyId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching services for specialty ID ${specialtyId}:`, error);
            throw error;
        }
    },

    getServicesByCategory: async (categoryId: number): Promise<ServiceDTO[]> => {
        try {
            const response = await axios.get(`${apiUrl}/category/${categoryId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching services for category ID ${categoryId}:`, error);
            throw error;
        }
    },

    getServicesSortedByRating: async (): Promise<ServiceDTO[]> => {
        try {
            const response = await axios.get(`${apiUrl}/sort/rating`);
            return response.data;
        } catch (error) {
            console.error('Error fetching services sorted by rating:', error);
            throw error;
        }
    }
};