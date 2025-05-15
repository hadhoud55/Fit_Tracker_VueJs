<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">My Orders</h1>
    <div v-for="order in orders" :key="order.id" class="bg-white p-6 rounded shadow-md mb-4">
      <div class="flex justify-between">
        <div>
          <h3 class="text-lg font-semibold text-primary">Order #{{ order.id }}</h3>
          <p class="text-gray-600">Total: ${{ order.total.toFixed(2) }}</p>
          <p class="text-gray-600">Status: {{ order.status }}</p>
        </div>
        <router-link :to="`/orders/${order.id}`" class="text-accent hover:underline">View Details</router-link>
      </div>
    </div>
    <Pagination :total-pages="totalPages" :current-page="currentPage" @page-changed="fetchOrders" />
  </div>
</template>

<script>
import Pagination from '@/components/shared/Pagination.vue';
import OrderService from '@/services/orders.js';

export default {
  components: {Pagination},
  data() {
    return {
      orders: [],
      currentPage: 0,
      totalPages: 0,
    };
  },
  async created() {
    await this.fetchOrders(0);
  },
  methods: {
    async fetchOrders(page) {
      try {
        const response = await OrderService.getByUserId(this.$store.getters.userId, page, 10);
        this.orders = response.data.content;
        this.totalPages = response.data.totalPages;
        this.currentPage = page;
      } catch (error) {
        this.$toast.error('Failed to load orders');
      }
    },
  },
};
</script>