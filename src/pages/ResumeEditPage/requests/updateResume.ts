import axios from 'axios';

export const updateResume = async (resumeId: number, updatedResume: any, authToken: string | undefined) => {
    try {
        const response = await axios.put(`http://localhost:3000/resume/${resumeId}`, {
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
