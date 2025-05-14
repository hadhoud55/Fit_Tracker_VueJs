<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">User Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded shadow-md">
        <h3 class="text-lg font-semibold text-primary">Active Bookings</h3>
        <p class="text-2xl text-gray-700">{{ stats.activeBookings }}</p>
      </div>
      <div class="bg-white p-6 rounded shadow-md">
        <h3 class="text-lg font-semibold text-primary">Recent Orders</h3>
        <p class="text-2xl text-gray-700">{{ stats.recentOrders }}</p>
      </div>
      <div class="bg-white p-6 rounded shadow-md">
        <h3 class="text-lg font-semibold text-primary">Membership Status</h3>
        <p class="text-2xl text-gray-700">{{ stats.membershipStatus || 'None' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import BookingService from '@/services/bookings.js';
import OrderService from '@/services/orders.js';

export default {
  data() {
    return {
      stats: {
        activeBookings: 0,
        recentOrders: 0,
        membershipStatus: 'None',
      },
    };
  },
  async created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push('/login');
      return;
    }
    try {
      const [bookingResponse, orderResponse] = await Promise.all([
        BookingService.getByUserId(this.$store.getters.userId, 0, 100),
        OrderService.getByUserId(this.$store.getters.userId, 0, 100),
      ]);
      this.stats.activeBookings = bookingResponse.data.content.filter(booking => booking.status === 'CONFIRMED').length;
      this.stats.recentOrders = orderResponse.data.content.length;
      const hasMembership = orderResponse.data.content.some(order =>
          order.items.some(item => item.product.id.startsWith('membership-'))
      );
      this.stats.membershipStatus = hasMembership ? 'Active' : 'None';
    } catch (error) {
      this.$toast.error('Failed to load dashboard');
    }
  },
};
</script>