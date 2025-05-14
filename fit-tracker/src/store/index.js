import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '@/services/auth.js';
import { decodeJwt } from '@/utils/jwt-decode.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
        cart: JSON.parse(localStorage.getItem('cart')) || [],
    },
    getters: {
        isAuthenticated: state => !!state.token,
        userRole: state => state.user ? state.user.role : null,
        userId: state => state.user ? state.user.id : null,
        cartItems: state => state.cart,
        cartTotal: state => state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    },
    mutations: {
        SET_AUTH(state, { token, user }) {
            state.token = token;
            state.user = user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        },
        CLEAR_AUTH(state) {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        ADD_TO_CART(state, { product, quantity }) {
            const existingItem = state.cart.find(item => item.product.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.cart.push({ product, quantity });
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        UPDATE_CART_ITEM(state, { productId, quantity }) {
            const item = state.cart.find(item => item.product.id === productId);
            if (item && quantity > 0) {
                item.quantity = quantity;
            } else if (item) {
                state.cart = state.cart.filter(item => item.product.id !== productId);
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        REMOVE_FROM_CART(state, productId) {
            state.cart = state.cart.filter(item => item.product.id !== productId);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        CLEAR_CART(state) {
            state.cart = [];
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const response = await AuthService.login(credentials);
                const { token } = response.data;
                const user = decodeJwt(token);
                if (!user) {
                    throw new Error('Failed to decode JWT token');
                }
                commit('SET_AUTH', { token, user });
                return user;
            } catch (error) {
                console.error('Login error:', error.response?.data?.message || error.message);
                throw error;
            }
        },
        async logout({ commit }) {
            commit('CLEAR_AUTH');
        },
        async refreshUser({ commit, state }) {
            try {
                if (state.token) {
                    const user = decodeJwt(state.token);
                    if (!user) {
                        throw new Error('Failed to decode JWT token');
                    }
                    commit('SET_AUTH', { token: state.token, user });
                }
            } catch (error) {
                console.error('Refresh user error:', error.message);
                commit('CLEAR_AUTH');
                throw error;
            }
        },
        addToCart({ commit }, { product, quantity }) {
            commit('ADD_TO_CART', { product, quantity });
        },
        updateCartItem({ commit }, { productId, quantity }) {
            commit('UPDATE_CART_ITEM', { productId, quantity });
        },
        removeFromCart({ commit }, productId) {
            commit('REMOVE_FROM_CART', productId);
        },
        clearCart({ commit }) {
            commit('CLEAR_CART');
        },
    },
});