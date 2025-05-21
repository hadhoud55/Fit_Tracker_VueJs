import authHeader from '@/utils/auth-header';
import axios from 'axios';

const API = 'http://localhost:8082/api/orders';

export default {
    // Get all orders (admin)
    getAll(page = 0, size = 10) {
        return axios.get(`${API}?page=${page}&size=${size}`, { headers: authHeader() });
    },

    // Get orders for current or specific user
    getUserOrders({ userId = null, page = 0, size = 10 }) {
        const url = userId ? `${API}/user?userId=${userId}&page=${page}&size=${size}` : `${API}/user?page=${page}&size=${size}`;
        return axios.get(url, { headers: authHeader() });
    },

    // Get order by ID
    getById(id) {
        return axios.get(`${API}/${id}`, { headers: authHeader() });
    },

    // Create new order
    create(data) {
        return axios.post(API, data, { headers: authHeader() });
    },

    // Update existing order
    update(id, data) {
        return axios.put(`${API}/${id}`, data, { headers: authHeader() });
    },

    // Delete an order
    delete(id) {
        return axios.delete(`${API}/${id}`, { headers: authHeader() });
    }
};
