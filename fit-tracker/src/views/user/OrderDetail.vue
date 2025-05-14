<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Order #{{ order.id }}</h1>
    <div class="bg-white p-6 rounded shadow-md">
      <p class="text-gray-600 mb-2">Total: ${{ order.total.toFixed(2) }}</p>
      <p class="text-gray-600 mb-2">Status: {{ order.status }}</p>
      <h2 class="text-xl font-bold text-primary mt-4 mb-2">Items</h2>
      <div v-for="item in order.items" :key="item.id" class="flex justify-between mb-2">
        <span>{{ item.product.name }} x {{ item.quantity }}</span>
        <span>${{ (item.product.price * item.quantity).toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import OrderService from '@/services/orders.js';

export default {
  data() {
    return {
      order: { items: [] },
    };
  },
  async created() {
    try {
      const response = await OrderService.getById(this.$route.params.id);
      this.order = response.data;
    } catch (error) {
      this.$toast.error('Failed to load order');
      this.$router.push('/orders');
    }
  },
};
</script>