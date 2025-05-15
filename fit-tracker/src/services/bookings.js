import axios from './axios.js';

const BookingService = {
    async create(bookingData) {
        try {
            const response = await axios.post('/bookings', bookingData);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error('Failed to create booking:', errorMessage);
            throw new Error(errorMessage);
        }
    },
    async getAll(page = 0, size = 10) {
        try {
            const response = await axios.get('/bookings', { params: { page, size } });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error('Failed to fetch bookings:', errorMessage);
            throw new Error(errorMessage);
        }
    },
    async getByUserId(userId) {
        try {
            const response = await axios.get(`/bookings/user/${userId}`);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`Failed to fetch bookings for user ${userId}:`, errorMessage);
            throw new Error(errorMessage);
        }
    },
    async update(id, bookingData) {
        try {
            const response = await axios.put(`/bookings/${id}`, bookingData);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`Failed to update booking ${id}:`, errorMessage);
            throw new Error(errorMessage);
        }
    },
    async delete(id) {
        try {
            await axios.delete(`/bookings/${id}`);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`Failed to delete booking ${id}:`, errorMessage);
            throw new Error(errorMessage);
        }
    },
    async getActiveBookingsCount(classId) {
        try {
            const response = await axios.get(`/bookings/count/${classId}`);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`Failed to fetch booking count for class ${classId}:`, errorMessage);
            throw new Error(errorMessage);
        }
    },
};

export default BookingService;