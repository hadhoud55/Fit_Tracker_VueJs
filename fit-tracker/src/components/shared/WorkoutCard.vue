<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
    <img :src="workout.imageUrls[0] || 'https://via.placeholder.com/300'" alt="Workout" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-lg font-semibold text-primary">{{ workout.name }}</h3>
      <p class="text-gray-600">{{ workout.category }}</p>
      <p class="text-sm text-gray-500">{{ workout.durationInMinutes }} min</p>
      <router-link :to="`/workouts/${workout.id}`" class="mt-2 inline-block text-accent hover:underline">
        View Details
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    workout: {
      type: Object,
      required: true,
    },
  },
};
</script>