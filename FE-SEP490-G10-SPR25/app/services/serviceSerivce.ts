import axios from 'axios';

const API_URL = 'https://api.example.com/services';

export const getServices = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
};