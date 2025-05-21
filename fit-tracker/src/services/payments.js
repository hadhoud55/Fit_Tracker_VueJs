import axios from './axios';

const PaymentService = {
    async create(payload) {
        return axios.post('/payments', payload).then(res => res.data);
    },

    async getByOrder(orderId) {
        return axios.get(`/payments/${orderId}`).then(res => res.data);
    },

    async getUserPayments(page = 0, size = 10) {
        return axios.get('/payments/user', { params: { page, size } }).then(res => res.data);
    },

    async getAll(page = 0, size = 10) {
        return axios.get('/payments', { params: { page, size } }).then(res => res.data);
    }
};

export default PaymentService;