<template>
  <div class="overflow-x-auto">
    <table class="w-full bg-white shadow-md rounded">
      <thead class="bg-gray-200">
      <tr>
        <th class="py-2 px-4 text-left">ID</th>
        <th class="py-2 px-4 text-left">Username</th>
        <th class="py-2 px-4 text-left">Email</th>
        <th class="py-2 px-4 text-left">Role</th>
        <th class="py-2 px-4 text-left">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id" class="border-b">
        <td class="py-2 px-4">{{ user.id }}</td>
        <td class="py-2 px-4">{{ user.username }}</td>
        <td class="py-2 px-4">{{ user.email }}</td>
        <td class="py-2 px-4">{{ user.role }}</td>
        <td class="py-2 px-4">
          <button @click="$emit('delete', user.id)" class="text-red-600 hover:text-red-800">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
};
</script>