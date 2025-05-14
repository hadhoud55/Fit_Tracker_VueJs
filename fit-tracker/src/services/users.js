import axios from './axios.js';

const UserService = {
    async getAll(page = 0, size = 10) {
        return axios.get(`/users?page=${page}&size=${size}`);
    },
    async getById(id) {
        return axios.get(`/users/${id}`);
    },
    async getCoaches() {
        return axios.get('/users/coaches');
    },
    async update(id, user) {
        return axios.put(`/users/${id}`, user);
    },
    async delete(id) {
        return axios.delete(`/users/${id}`);
    },
};

export default UserService;