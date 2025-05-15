<template>
  <div class="space-y-4">
    <div v-for="review in reviews" :key="review.id" class="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <h4 class="font-semibold text-primary">{{ review.user.username }}</h4>
        <p class="text-gray-600">{{ review.comment }}</p>
        <p class="text-yellow-500">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</p>
      </div>
      <button @click="$emit('delete', review.id)" class="text-red-600 hover:text-red-800">Delete</button>
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
};
</script>