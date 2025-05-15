<template>
  <div class="bg-white p-6 rounded shadow-md">
    <h2 class="text-xl font-bold text-primary mb-4">Class Schedule</h2>
    <div v-for="session in sessions" :key="session.id" class="mb-2">
      <p class="text-gray-700">{{ formatDate(session.startTime) }} - {{ formatDate(session.endTime) }}</p>
      <p class="text-sm text-gray-500">Location: {{ session.location }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sessions: {
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