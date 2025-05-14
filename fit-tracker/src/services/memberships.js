import axios from './axios.js';

const MembershipService = {
    async getAll() {
        try {
            const response = await axios.get('/memberships');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch memberships:', error.response?.data || error.message);
            throw error;
        }
    },
    async getById(id) {
        try {
            const response = await axios.get(`/memberships/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch membership ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },
    async create(membership) {
        try {
            const response = await axios.post('/memberships', membership);
            return response.data;
        } catch (error) {
            console.error('Failed to create membership:', error.response?.data || error.message);
            throw error;
        }
    },
    async update(id, membership) {
        try {
            const response = await axios.put(`/memberships/${id}`, membership);
            return response.data;
        } catch (error) {
            console.error(`Failed to update membership ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },
    async delete(id) {
        try {
            await axios.delete(`/memberships/${id}`);
        } catch (error) {
            console.error(`Failed to delete membership ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },
};

export default MembershipService;