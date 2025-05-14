<template>
  <div class="space-y-4">
    <div v-for="booking in bookings" :key="booking.id" class="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <h4 class="font-semibold text-primary">{{ booking.className }}</h4>
        <p class="text-gray-600">{{ formatDate(booking.bookingDate) }}</p>
        <p class="text-sm text-gray-500">Status: {{ booking.status }}</p>
      </div>
      <div>
        <button @click="$emit('edit', booking)" class="text-accent hover:underline mr-4">Edit</button>
        <button @click="$emit('delete', booking.id)" class="text-red-600 hover:text-red-800">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bookings: {
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