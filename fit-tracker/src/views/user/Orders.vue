<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">My Orders</h1>
    <div v-if="loading">Loading orders...</div>
    <div v-else-if="orders.length === 0">No orders found.</div>
    <div v-else>
      <ul class="space-y-4">
        <li v-for="o in orders" :key="o.id" class="p-4 border rounded shadow">
          <p><strong>Date:</strong> {{ formatDate(o.orderDate) }}</p>
          <p><strong>Status:</strong> {{ o.status }}</p>
          <p><strong>Total:</strong> ${{ o.totalAmount.toFixed(2) }}</p>
          <router-link :to="`/order/${o.id}`" class="text-accent underline">View Details</router-link>
        </li>
      </ul>
      <Pagination :total-pages="totalPages" :current-page="currentPage" @page-changed="fetchOrders" />
    </div>
  </div>
</template>

<script>
import OrderService from '@/services/orders';
import Pagination from '@/components/shared/Pagination.vue';

export default {
  components: { Pagination },
  data() {
    return {
      orders: [],
      loading: true,
      currentPage: 0,
      totalPages: 0
    };
  },
  async created() {
    await this.fetchOrders(0);
  },
  methods: {
    async fetchOrders(page) {
      try {
        const res = await OrderService.getUserOrders({ page, size: 10 });
        this.orders = res.data.content;
        this.totalPages = res.data.totalPages;
        this.currentPage = page;
      } catch (err) {
        this.$toast.error('Failed to load orders');
      } finally {
        this.loading = false;
      }
    },
    formatDate(d) {
      return new Date(d).toLocaleString();
    }
  }
};
</script>