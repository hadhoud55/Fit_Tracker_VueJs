<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Manage Orders</h1>
    <OrderTable
        :orders="orders"
        @update="editOrder"
        @delete="deleteOrder"
    />
    <Pagination :total-pages="totalPages" :current-page="currentPage" @page-changed="fetchOrders" />
  </div>
</template>

<script>
import OrderTable from '@/components/admin/OrderTable.vue';
import OrderService from '@/services/orders.js';
import Pagination from "@/components/shared/Pagination.vue";

export default {
  components: {Pagination, OrderTable },
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
        const response = await OrderService.getAll(page, 10);
        this.orders = response.data.content;
        this.totalPages = response.data.totalPages;
        this.currentPage = page;
      } catch (error) {
        this.$toast.error('Failed to load orders');
      }
    },
    editOrder(order) {
      // Implement order update form if needed
      this.$toast.info('Order update not implemented');
    },
    async deleteOrder(id) {
      try {
        await OrderService.delete(id);
        this.$toast.success('Order deleted');
        await this.fetchOrders(this.currentPage);
      } catch (error) {
        this.$toast.error('Failed to delete order');
      }
    },
  },
};
</script>