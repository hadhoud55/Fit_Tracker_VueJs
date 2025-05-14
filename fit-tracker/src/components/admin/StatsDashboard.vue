<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white p-6 rounded shadow-md">
      <h3 class="text-lg font-semibold text-primary">Total Users</h3>
      <p class="text-2xl text-gray-700">{{ stats.totalUsers }}</p>
    </div>
    <div class="bg-white p-6 rounded shadow-md">
      <h3 class="text-lg font-semibold text-primary">Total Orders</h3>
      <p class="text-2xl text-gray-700">{{ stats.totalOrders }}</p>
    </div>
    <div class="bg-white p-6 rounded shadow-md">
      <h3 class="text-lg font-semibold text-primary">Total Revenue</h3>
      <p class="text-2xl text-gray-700">${{ stats.totalRevenue.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/users.js';
import OrderService from '@/services/orders.js';

export default {
  data() {
    return {
      stats: {
        totalUsers: 0,
        totalOrders: 0,
        totalRevenue: 0,
      },
    };
  },
  async created() {
    try {
      const [userResponse, orderResponse] = await Promise.all([
        UserService.getAll(0, 1), // Fetch first page to get total elements
        OrderService.getAll(0, 1000), // Fetch all orders (adjust size as needed)
      ]);
      this.stats.totalUsers = userResponse.data.totalElements;
      this.stats.totalOrders = orderResponse.data.totalElements;
      this.stats.totalRevenue = orderResponse.data.content.reduce((sum, order) => sum + order.total, 0);
    } catch (error) {
      this.$toast.error('Failed to load stats');
    }
  },
};
</script>