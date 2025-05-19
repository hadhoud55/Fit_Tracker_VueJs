import axios from './axios';

const OrderService = {
    getAll({ page = 0, size = 10 } = {}) {
        return axios.get('/orders', { params: { page, size } })
            .then(res => res.data);
    },

    getById(orderId) {
        return axios.get(`/orders/${orderId}`)
            .then(res => res.data);
    },

    getByUser(userId, { page = 0, size = 10 } = {}) {
        return axios.get(`/orders/user/${userId}`, { params: { page, size } })
            .then(res => res.data);
    },

    create(orderPayload) {
        return axios.post('/orders', orderPayload)
            .then(res => res.data);
    },

    update(orderId, orderPayload) {
        return axios.put(`/orders/${orderId}`, orderPayload)
            .then(res => res.data);
    },

    delete(orderId) {
        return axios.delete(`/orders/${orderId}`);
    }
};

export default OrderService;
