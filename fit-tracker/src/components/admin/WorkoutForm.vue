<template>
  <div class="ml-64 p-6">
    <h2 class="text-xl font-bold text-primary mb-4">
      {{ isEdit ? 'Edit' : 'New' }} Workout
    </h2>
    <form @submit.prevent="submitWorkout" class="space-y-4 bg-white p-6 rounded shadow-md">
      <div>
        <label class="block text-gray-700">Name</label>
        <input v-model="form.name" class="w-full p-2 border rounded" required />
      </div>
      <div>
        <label class="block text-gray-700">Category</label>
        <input v-model="form.category" class="w-full p-2 border rounded" required />
      </div>
      <div>
        <label class="block text-gray-700">Duration (min)</label>
        <input v-model.number="form.durationInMinutes" type="number" class="w-full p-2 border rounded" required />
      </div>
      <div>
        <label class="block text-gray-700">Image URLs (comma-separated)</label>
        <input v-model="form.imageUrls" class="w-full p-2 border rounded" />
      </div>
      <button type="submit" class="bg-accent text-white py-2 px-4 rounded hover:bg-green-700">
        Save Workout
      </button>
    </form>
  </div>
</template>

<script>
import WorkoutService from '@/services/workouts.js';

export default {
  props: { workout: { type: Object, default: null } },
  data() {
    return {
      form: {
        name: '',
        category: '',
        durationInMinutes: null,
        imageUrls: ''
      }
    };
  },
  computed: {
    isEdit() { return !!this.workout; }
  },
  created() {
    if (this.isEdit) {
      this.form = {
        ...this.workout,
        imageUrls: this.workout.imageUrls?.join(',') || ''
      };
    }
  },
  methods: {
    async submitWorkout() {
      try {
        const payload = {
          ...this.form,
          imageUrls: this.form.imageUrls.split(',').map(u => u.trim())
        };
        if (this.isEdit) {
          await WorkoutService.update(this.workout.id, payload);
          this.$toast.open({ message: 'Workout updated', type: 'success' });
        } else {
          await WorkoutService.create(payload);
          this.$toast.open({ message: 'Workout created', type: 'success' });
        }
        this.$emit('saved');
      } catch {
        this.$toast.open({ message: 'Save failed', type: 'error' });
      }
    }
  }
};
</script>
