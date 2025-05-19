<template>
  <div class="overflow-x-auto ml-64 p-6">
    <h2 class="text-xl font-bold text-primary mb-4">Payments</h2>
    <table class="w-full bg-white shadow-md rounded">
      <thead class="bg-gray-200">
      <tr>
        <th class="py-2 px-4 text-left">ID</th>
        <th class="py-2 px-4 text-left">Order</th>
        <th class="py-2 px-4 text-left">Amount</th>
        <th class="py-2 px-4 text-left">Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="p in payments" :key="p.id" class="border-b">
        <td class="py-2 px-4">{{ p.id }}</td>
        <td class="py-2 px-4">{{ p.orderId }}</td>
        <td class="py-2 px-4">${{ p.amount.toFixed(2) }}</td>
        <td class="py-2 px-4">{{ new Date(p.timestamp).toLocaleString() }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PaymentService from '@/services/payments.js';

export default {
  data() {
    return { payments: [] };
  },
  async created() {
    try {
      this.payments = await PaymentService.getAll({ page:0,size:100 });
    } catch {
      this.$toast.open({ message:'Failed to load payments', type:'error' });
    }
  }
};
</script>
