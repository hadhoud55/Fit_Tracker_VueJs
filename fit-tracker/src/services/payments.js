import axios from './axios';

const PaymentService = {
    create(paymentPayload) {
        return axios.post('/payments', paymentPayload)
            .then(res => res.data);
    },

    getByUser(userId, { page = 0, size = 10 } = {}) {
        return axios.get(`/payments/user/${userId}`, { params: { page, size } })
            .then(res => res.data);
    }
};

export default PaymentService;
