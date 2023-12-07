import axios from 'axios';
import { SERVER_URL } from 'shared/api/api';

export const fetchResumeData = async (resumeId: number) => {
    try {
        const response = await axios.get(`${SERVER_URL}/resume/${resumeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching resume data:', error);
        throw error;
    }
};
