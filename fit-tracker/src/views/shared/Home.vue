<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Welcome to FitTracker</h1>
    <p class="text-gray-700 mb-8">
      Discover workouts, classes, products, and memberships to achieve your fitness goals.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <WorkoutCard
          v-for="w in workouts"
          :key="w.id"
          :workout="w"
      />
    </div>
  </div>
</template>

<script>
import WorkoutCard from '@/components/shared/WorkoutCard.vue';
import WorkoutService from '@/services/workouts.js';

export default {
  components: { WorkoutCard },
  data() {
    return { workouts: [] };
  },
  async created() {
    try {
      // search({ keyword, page, size })
      const resp = await WorkoutService.search({ keyword:'', page:0, size:6 });
      this.workouts = resp.content;
    } catch {
      this.$toast.open({ message: 'Failed to load workouts', type: 'error' });
    }
  }
};
</script>
