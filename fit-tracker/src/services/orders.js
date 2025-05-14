import axios from './axios.js';

const OrderService = {
    async getAll(page = 0, size = 10) {
        return axios.get(`/orders?page=${page}&size=${size}`);
    },
    async getById(id) {
        return axios.get(`/orders/${id}`);
    },
    async getByUserId(userId, page = 0, size = 10) {
        return axios.get(`/orders/user/${userId}?page=${page}&size=${size}`);
    },
    async create(order) {
        return axios.post('/orders', order);
    },
    async update(id, order) {
        return axios.put(`/orders/${id}`, order);
    },
    async delete(id) {
        return axios.delete(`/orders/${id}`);
    },
};

export default OrderService;