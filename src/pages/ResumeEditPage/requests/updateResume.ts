import axios from 'axios';
import { SERVER_URL } from 'shared/api/api';

export const updateResume = async (resumeId: number, updatedResume: any, authToken: string | undefined) => {
    try {
        const response = await axios.put(`${SERVER_URL}/resume/${resumeId}`, {
            resume: updatedResume,
        }, {
            headers: {
                Authorization: `${authToken}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error('Error updating resume');
    }
};
