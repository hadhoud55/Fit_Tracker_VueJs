<template>
  <div class="space-y-4">
    <div v-for="review in reviews" :key="review.id" class="bg-white p-4 rounded shadow">
      <div class="flex justify-between">
        <h4 class="font-semibold text-primary">{{ review.user.username }}</h4>
        <span class="text-yellow-500">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
      </div>
      <p class="text-gray-600">{{ review.comment }}</p>
      <p class="text-sm text-gray-500">{{ formatDate(review.createdAt) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>