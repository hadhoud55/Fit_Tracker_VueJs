<template>
  <div class="border rounded-lg p-4 shadow hover:shadow-lg transition">
    <img
        :src="workout.imageUrls[0]||placeholder"
        alt="Workout"
        class="w-full h-40 object-cover rounded"
    />
    <h3 class="mt-2 text-lg font-semibold">{{ workout.name }}</h3>
    <p class="text-gray-600">{{ workout.category }}</p>
    <div class="mt-4 flex justify-between">
      <router-link
          :to="{ name:'WorkoutDetail', params:{ id: workout.id }}"
          class="text-blue-500 hover:underline"
      >Details</router-link>
      <button
          @click="incrementView"
          class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >View</button>
    </div>
  </div>
</template>

<script>
import WorkoutService from '@/services/workouts.js';
export default {
  props: { workout: { type:Object, required:true } },
  data() { return { placeholder:'https://via.placeholder.com/300' }; },
  methods: {
    async incrementView() {
      try {
        await WorkoutService.update(this.workout.id, {
          ...this.workout,
          viewCount: (this.workout.viewCount||0)+1
        });
        this.$toast.open({ message:'Count +1', type:'success' });
        this.$router.push({ name:'WorkoutDetail', params:{ id:this.workout.id }});
      } catch {
        this.$toast.open({ message:'Failed', type:'error' });
      }
    }
  }
};
</script>
