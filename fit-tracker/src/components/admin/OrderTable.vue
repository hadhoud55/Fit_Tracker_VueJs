<template>
  <div class="overflow-x-auto ml-64 p-6">
    <h2 class="text-xl font-bold text-primary mb-4">Orders</h2>
    <table class="w-full bg-white shadow-md rounded">
      <thead class="bg-gray-200">
      <tr>
        <th class="py-2 px-4 text-left">ID</th>
        <th class="py-2 px-4 text-left">User</th>
        <th class="py-2 px-4 text-left">Total</th>
        <th class="py-2 px-4 text-left">Status</th>
        <th class="py-2 px-4 text-left">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="o in orders" :key="o.id" class="border-b">
        <td class="py-2 px-4">{{ o.id }}</td>
        <td class="py-2 px-4">{{ o.user.username }}</td>
        <td class="py-2 px-4">${{ o.total.toFixed(2) }}</td>
        <td class="py-2 px-4">{{ o.status }}</td>
        <td class="py-2 px-4 space-x-2">
          <button @click="$emit('update', o)" class="text-blue-500 hover:underline">Update</button>
          <button @click="deleteOrder(o.id)" class="text-red-600 hover:text-red-800">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import OrderService from '@/services/orders.js';

export default {
  data() {
    return { orders: [] };
  },
  async created() {
    try {
      const resp = await OrderService.getAll({ page:0,size:100 });
      this.orders = resp.content;
    } catch {
      this.$toast.open({ message:'Failed to load orders', type:'error' });
    }
  },
  methods: {
    async deleteOrder(id) {
      try {
        await OrderService.delete(id);
        this.orders = this.orders.filter(o => o.id !== id);
        this.$toast.open({ message:'Order deleted', type:'success' });
      } catch {
        this.$toast.open({ message:'Delete failed', type:'error' });
      }
    }
  }
};
</script>
