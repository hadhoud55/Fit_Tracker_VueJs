import axios from './axios.js';

const ReviewService = {
    async getAll(page = 0, size = 10) {
        return axios.get(`/reviews?page=${page}&size=${size}`);
    },
    async getByClassId(classId, page = 0, size = 10) {
        return axios.get(`/reviews/class/${classId}?page=${page}&size=${size}`);
    },
    async create(review) {
        return axios.post('/reviews', review);
    },
    async update(id, review) {
        return axios.put(`/reviews/${id}`, review);
    },
    async delete(id) {
        return axios.delete(`/reviews/${id}`);
    },
};

export default ReviewService;