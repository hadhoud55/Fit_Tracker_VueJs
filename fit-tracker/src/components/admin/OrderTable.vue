<template>
  <div class="overflow-x-auto">
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
      <tr v-for="order in orders" :key="order.id" class="border-b">
        <td class="py-2 px-4">{{ order.id }}</td>
        <td class="py-2 px-4">{{ order.user.username }}</td>
        <td class="py-2 px-4">${{ order.total.toFixed(2) }}</td>
        <td class="py-2 px-4">{{ order.status }}</td>
        <td class="py-2 px-4">
          <button @click="$emit('update', order)" class="text-accent hover:underline mr-4">Update</button>
          <button @click="$emit('delete', order.id)" class="text-red-600 hover:text-red-800">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
};
</script>