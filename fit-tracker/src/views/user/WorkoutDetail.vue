<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">{{ workout.name }}</h1>
    <div class="bg-white p-6 rounded shadow-md">
      <img :src="workout.imageUrls[0] || 'https://via.placeholder.com/600'" alt="Workout" class="w-full h-64 object-cover rounded mb-4" />
      <p class="text-gray-600 mb-2">Category: {{ workout.category }}</p>
      <p class="text-gray-600 mb-2">Duration: {{ workout.durationInMinutes }} minutes</p>
      <p class="text-gray-700">{{ workout.description || 'No description available.' }}</p>
    </div>
  </div>
</template>

<script>
import WorkoutService from '@/services/workouts.js';

export default {
  data() {
    return {
      workout: {},
    };
  },
  async created() {
    try {
      const response = await WorkoutService.getById(this.$route.params.id);
      this.workout = response.data;
    } catch (error) {
      this.$toast.error('Failed to load workout');
      this.$router.push('/workouts');
    }
  },
};
</script>