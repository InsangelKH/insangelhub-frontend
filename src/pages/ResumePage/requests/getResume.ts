import axios from 'axios';

export const fetchResumeData = async (resumeId: number) => {
    try {
        const response = await axios.get(`http://localhost:3000/resume/${resumeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching resume data:', error);
        throw error;
    }
};
