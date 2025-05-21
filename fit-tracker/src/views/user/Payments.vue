<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">My Payments</h1>

    <div v-if="payments.length === 0">You have no payments yet.</div>

    <div v-else>
      <table class="w-full bg-white rounded shadow table-auto">
        <thead>
        <tr class="bg-gray-100">
          <th class="p-2">Order ID</th>
          <th class="p-2">Amount</th>
          <th class="p-2">Status</th>
          <th class="p-2">Paid At</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="p in payments" :key="p.id" class="border-t">
          <td class="p-2">{{ p.orderId }}</td>
          <td class="p-2">${{ p.amount.toFixed(2) }}</td>
          <td class="p-2">{{ p.status }}</td>
          <td class="p-2">{{ formatDate(p.paymentDate) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PaymentService from '@/services/payments';

export default {
  data() {
    return {
      payments: []
    };
  },
  async created() {
    try {
      const res = await PaymentService.getUserPayments();
      this.payments = res.data.content;
    } catch (e) {
      this.$toast.error('Failed to load payments');
    }
  },
  methods: {
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString();
    }
  }
};
</script>
