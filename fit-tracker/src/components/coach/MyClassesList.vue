<template>
  <div class="bg-white p-6 rounded shadow-md">
    <h2 class="text-xl font-semibold mb-4">My Classes</h2>
    <table class="w-full table-auto">
      <thead>
      <tr class="bg-gray-100">
        <th class="p-2 text-left">Title</th>
        <th class="p-2 text-left">Start Time</th>
        <th class="p-2 text-left">Duration</th>
        <th class="p-2 text-left">Capacity</th>
        <th class="p-2 text-left">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="gymClass in classes" :key="gymClass.id">
        <td class="p-2">{{ gymClass.title }}</td>
        <td class="p-2">{{ formatDate(gymClass.startTime) }}</td>
        <td class="p-2">{{ gymClass.duration }} minutes</td>
        <td class="p-2">{{ gymClass.capacity }}</td>
        <td class="p-2">
          <button @click="$emit('edit-class', gymClass)" class="text-blue-500 hover:underline mr-2">Edit</button>
          <button @click="$emit('delete-class', gymClass.id)" class="text-red-500 hover:underline">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    classes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
};
</script>