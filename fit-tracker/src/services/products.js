import axios from './axios';

const ProductService = {
    search({ keyword = '', page = 0, size = 10 } = {}) {
        return axios.get('/products/search', { params: { keyword, page, size } })
            .then(res => res.data);
    },

    getById(productId) {
        return axios.get(`/products/${productId}`)
            .then(res => res.data);
    },

    create(productPayload) {
        return axios.post('/products', productPayload)
            .then(res => res.data);
    },

    update(productId, productPayload) {
        return axios.put(`/products/${productId}`, productPayload)
            .then(res => res.data);
    },

    delete(productId) {
        return axios.delete(`/products/${productId}`);
    },

    getLowStock({ threshold = 10, page = 0, size = 10 } = {}) {
        return axios.get('/products/low-stock', { params: { threshold, page, size } })
            .then(res => res.data);
    },

    updateStock(productId, quantity) {
        return axios.put(`/products/${productId}/stock`, null, { params: { quantity } })
            .then(res => res.data);
    },

    setStock(productId, stock) {
        return axios.put(`/products/${productId}/stock/set`, null, { params: { stock } })
            .then(res => res.data);
    }
};

export default ProductService;
