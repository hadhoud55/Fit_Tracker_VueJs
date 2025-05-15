import axios from './axios.js';

const PaymentService = {
    async create(payment) {
        return axios.post('/payments', payment);
    },
    async getByUserId(userId, page = 0, size = 10) {
        return axios.get(`/payments/user/${userId}?page=${page}&size=${size}`);
    },
};

export default PaymentService;