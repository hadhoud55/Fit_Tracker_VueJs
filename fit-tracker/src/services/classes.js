import axios from './axios.js';

const ClassService = {
    async search(keyword, page = 0, size = 10) {
        try {
            const response = await axios.get('/classes/search', {
                params: { keyword, page, size },
            });
            return response.data;
        } catch (error) {
            console.error('Failed to search classes:', error.response?.data || error.message);
            throw error;
        }
    },
    async getById(id) {
        try {
            const response = await axios.get(`/classes/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch class ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },
    async getByCoach(coachId, page = 0, size = 10) {
        try {
            const response = await axios.get(`/classes/by-coach/${coachId}`, {
                params: { page, size },
            });
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch classes for coach ${coachId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    async create(classData) {
        try {
            const response = await axios.post('/classes', classData);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data || error.message;
            console.error('Failed to create class:', errorMessage);
            throw new Error(errorMessage);
        }
    },
    async update(id, classData) {
        try {
            const response = await axios.put(`/classes/${id}`, classData);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data || error.message;
            console.error(`Failed to update class ${id}:`, errorMessage);
            throw new Error(errorMessage);
        }
    },
    async delete(id) {
        try {
            await axios.delete(`/classes/${id}`);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data || error.message;
            console.error(`Failed to delete class ${id}:`, errorMessage);
            throw new Error(errorMessage);
        }
    },
};

export default ClassService;