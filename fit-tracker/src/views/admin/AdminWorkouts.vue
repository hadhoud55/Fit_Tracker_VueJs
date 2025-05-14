<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Manage Workouts</h1>
    <WorkoutForm v-if="showForm" :workout="selectedWorkout" @submitted="fetchWorkouts" class="mb-6" />
    <button
        v-else
        @click="showForm = true"
        class="mb-6 bg-accent text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Create Workout
    </button>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <WorkoutCard v-for="workout in workouts" :key="workout.id" :workout="workout" />
    </div>
    <Pagination :total-pages="totalPages" :current-page="currentPage" @page-changed="fetchWorkouts" />
  </div>
</template>

<script>
import WorkoutForm from '@/components/admin/WorkoutForm.vue';
import WorkoutCard from '@/components/shared/WorkoutCard.vue';
import WorkoutService from '@/services/workouts.js';
import Pagination from "@/components/shared/Pagination.vue";

export default {
  components: {Pagination, WorkoutForm, WorkoutCard },
  data() {
    return {
      workouts: [],
      showForm: false,
      selectedWorkout: null,
      currentPage: 0,
      totalPages: 0,
    };
  },
  async created() {
    await this.fetchWorkouts(0);
  },
  methods: {
    async fetchWorkouts(page) {
      try {
        const response = await WorkoutService.getAll(page, 9);
        this.workouts = response.data.content;
        this.totalPages = response.data.totalPages;
        this.currentPage = page;
        this.showForm = false;
        this.selectedWorkout = null;
      } catch (error) {
        this.$toast.error('Failed to load workouts');
      }
    },
    editWorkout(workout) {
      this.selectedWorkout = workout;
      this.showForm = true;
    },
  },
};
</script>