import axios from './axios.js';

const WorkoutService = {
    async searchWorkouts(keyword, page = 0, size = 10) {
        return axios.get(`/workouts?keyword=${keyword}&page=${page}&size=${size}`);
    },
    async getById(id) {
        return axios.get(`/workouts/${id}`);
    },
    async getAll(page = 0, size = 10) {
        return axios.get(`/workouts?page=${page}&size=${size}`);
    },
    async create(workout) {
        return axios.post('/workouts', workout);
    },
    async update(id, workout) {
        return axios.put(`/workouts/${id}`, workout);
    },
    async delete(id) {
        return axios.delete(`/workouts/${id}`);
    },
};

export default WorkoutService;