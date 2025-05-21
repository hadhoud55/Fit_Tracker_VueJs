import axios from './axios';
const API = '/payments';

export default {
    // Create a payment
    async create(payload) {
        const res = await axios.post(API, payload);
        return res.data;  // now includes { id, orderId, amount, paymentDate, status, paymentMethod, cardLast4 }
    },

    // Get payment by ID
    async getById(id) {
        const res = await axios.get(`${API}/${id}`);
        return res.data;
    },

    // User’s payments
    async getUserPayments(page = 0, size = 10) {
        const res = await axios.get(`${API}/user`, { params: { page, size } });
        return res.data;
    },

    // Admin: all payments
    async getAll(page = 0, size = 10) {
        const res = await axios.get(API, { params: { page, size } });
        return res.data;
    }
};
