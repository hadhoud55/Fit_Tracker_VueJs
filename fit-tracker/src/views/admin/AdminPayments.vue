<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Payments</h1>

    <table class="w-full table-auto bg-white rounded shadow">
      <thead>
      <tr class="bg-gray-100 text-left">
        <th class="p-2">Payment ID</th>
        <th class="p-2">Order ID</th>
        <th class="p-2">User</th>
        <th class="p-2">Amount</th>
        <th class="p-2">Paid At</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="p in payments" :key="p.id" class="border-t">
        <td class="p-2">{{ p.id }}</td>
        <td class="p-2">{{ p.order.id }}</td>
        <td class="p-2">{{ p.user.email }}</td>
        <td class="p-2">${{ p.amount.toFixed(2) }}</td>
        <td class="p-2">{{ formatDate(p.createdAt) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '@/services/axios';

export default {
  data() {
    return {
      payments: []
    };
  },
  async created() {
    try {
      const res = await axios.get('/payments');
      this.payments = res.data;
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
