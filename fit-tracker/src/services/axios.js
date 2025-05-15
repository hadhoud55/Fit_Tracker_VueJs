import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8082/api',
});

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            store.dispatch('logout');
            window.location = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;