<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">My Payments</h1>
    <div v-for="payment in payments" :key="payment.id" class="bg-white p-6 rounded shadow-md mb-4">
      <p class="text-gray-600">Payment #{{ payment.id }}</p>
      <p class="text-gray-600">Amount: ${{ payment.amount.toFixed(2) }}</p>
      <p class="text-gray-600">Date: {{ formatDate(payment.createdAt) }}</p>
    </div>
    <Pagination :total-pages="totalPages" :current-page="currentPage" @page-changed="fetchPayments" />
  </div>
</template>

<script>
import Pagination from '@/components/shared/Pagination.vue';
import PaymentService from '@/services/payments.js';

export default {
  components: {Pagination},
  data() {
    return {
      payments: [],
      currentPage: 0,
      totalPages: 0,
    };
  },
  async created() {
    await this.fetchPayments(0);
  },
  methods: {
    async fetchPayments(page) {
      try {
        const response = await PaymentService.getByUserId(this.$store.getters.userId, page, 10);
        this.payments = response.data.content;
        this.totalPages = response.data.totalPages;
        this.currentPage = page;
      } catch (error) {
        this.$toast.error('Failed to load payments');
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
};
</script>