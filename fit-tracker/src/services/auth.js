import axios from './axios.js';

const AuthService = {
    async login(credentials) {
        try {
            const response = await axios.post('/auth/authenticate', credentials);
            return response;
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            throw error;
        }
    },
    async register(user) {
        try {
            const response = await axios.post('/auth/register', user);
            return response;
        } catch (error) {
            console.error('Register error:', error.response?.data || error.message);
            throw error;
        }
    },
    async logout(){
        localStorage.removeItem('token');

    }
};

export default AuthService;