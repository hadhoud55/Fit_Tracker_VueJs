<template>
  <div v-if="classItem" class="bg-white p-6 rounded shadow-md">
    <h2 class="text-xl font-semibold text-primary">{{ classItem.title }}</h2>
    <p class="text-gray-600">{{ classItem.category || 'No category' }}</p>
    <p><strong>Coach:</strong> {{ classItem.coachName || 'N/A' }}</p>
    <p><strong>Start Time:</strong> {{ formatDate(classItem.startTime) }}</p>
    <p><strong>Duration:</strong> {{ classItem.duration }} minutes</p>
    <div v-if="classItem.imageUrls?.length" class="mt-2">
      <img
          :src="classItem.imageUrls[0]"
          alt="Class Image"
          class="w-full h-48 object-cover rounded"
      />
    </div>
    <button
        @click="$emit('view-details')"
        class="mt-4 bg-accent text-white py-2 px-4 rounded hover:bg-green-700"
    >
      View Details
    </button>
  </div>
  <div v-else class="bg-white p-6 rounded shadow-md text-red-500">
    Class data not available
  </div>
</template>

<script>
export default {
  props: {
    classItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return date ? new Date(date).toLocaleString() : 'N/A';
    },
  },
};
</script>