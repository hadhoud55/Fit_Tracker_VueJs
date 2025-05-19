import axios from './axios';

const ReviewService = {
    getForWorkout(workoutId, { page = 0, size = 10 } = {}) {
        return axios.get(`/reviews/workout/${workoutId}`, { params: { page, size } })
            .then(res => res.data);
    },

    getForUser(userId, { page = 0, size = 10 } = {}) {
        return axios.get(`/reviews/user/${userId}`, { params: { page, size } })
            .then(res => res.data);
    },

    create(reviewPayload) {
        return axios.post('/reviews', reviewPayload)
            .then(res => res.data);
    },

    delete(reviewId) {
        return axios.delete(`/reviews/${reviewId}`);
    }
};

export default ReviewService;
