<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Order #{{ order.id }}</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <p><strong>Date:</strong> {{ formatDate(order.orderDate) }}</p>
      <p><strong>Status:</strong> {{ order.status }}</p>
      <p><strong>Total:</strong> ${{ order.totalAmount.toFixed(2) }}</p>
      <div class="mt-4">
        <h3 class="text-lg font-semibold">Items:</h3>
        <ul>
          <li v-for="item in order.items" :key="item.productId">
            {{ item.productName }} - ${{ item.price }} x {{ item.quantity }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import OrderService from '@/services/orders';

export default {
  data() {
    return {
      order: null,
      loading: true
    };
  },
  async created() {
    try {
      const res = await OrderService.getById(this.$route.params.id);
      this.order = res.data;
    } catch (e) {
      this.$toast.error('Failed to load order');
      this.$router.push('/orders');
    } finally {
      this.loading = false;
    }
  },
  methods: {
    formatDate(d) {
      return new Date(d).toLocaleString();
    }
  }
};
</script>
