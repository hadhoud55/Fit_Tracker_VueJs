import axios from './axios.js';

const ProductService = {
    async searchProducts(keyword, page = 0, size = 10) {
        return axios.get(`/products?keyword=${keyword}&page=${page}&size=${size}`);
    },
    async getById(id) {
        return axios.get(`/products/${id}`);
    },
    async create(product) {
        return axios.post('/products', product);
    },
    async update(id, product) {
        return axios.put(`/products/${id}`, product);
    },
    async delete(id) {
        return axios.delete(`/products/${id}`);
    },
    async getLowStock(threshold, page = 0, size = 10) {
        return axios.get(`/products/low-stock?threshold=${threshold}&page=${page}&size=${size}`);
    },
    async updateStock(productId, quantity) {
        return axios.put(`/products/${productId}/stock`, null, { params: { quantity } });
    },
    async setStock(productId, stock) {
        return axios.put(`/products/${productId}/stock/set`, null, { params: { stock } });
    },
};

export default ProductService;