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
        <label class="block text-gray-700">Description</label>
        <textarea v-model="form.description" class="w-full p-2 border rounded" required></textarea>
      </div>
      <div>
        <label class="block text-gray-700">Duration (min)</label>
        <input v-model.number="form.durationInMinutes" type="number" class="w-full p-2 border rounded" required />
      </div>
      <div>
        <label class="block text-gray-700">Coach ID</label>
        <input v-model.number="form.coachId" type="number" class="w-full p-2 border rounded" required />
      </div>
      <div>
        <label class="block text-gray-700">Image URLs (comma-separated)</label>
        <input v-model="form.imageUrls" class="w-full p-2 border rounded" />
      </div>
      <div class="flex space-x-4">
        <button type="submit" class="bg-accent text-white py-2 px-4 rounded hover:bg-green-700">
          Save Workout
        </button>
        <button type="button" @click="$emit('cancel')" class="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import WorkoutService from '@/services/workouts.js';

export default {
  props: {
    workout: { type: Object, default: null }
  },
  data() {
    return {
      form: {
        name: '',
        category: '',
        description: '',
        durationInMinutes: null,
        coachId: null,
        imageUrls: ''
      }
    };
  },
  computed: {
    isEdit() {
      return !!this.workout;
    }
  },
  created() {
    if (this.isEdit) {
      this.form = {
        name: this.workout.name || '',
        category: this.workout.category || '',
        description: this.workout.description || '',
        durationInMinutes: this.workout.durationInMinutes || null,
        coachId: this.workout.coachId || null,
        imageUrls: this.workout.imageUrls?.join(',') || ''
      };
    }
  },
  methods: {
    async submitWorkout() {
      try {
        const payload = {
          name: this.form.name,
          category: this.form.category,
          description: this.form.description,
          durationInMinutes: this.form.durationInMinutes,
          coachId: this.form.coachId,
          imageUrls: this.form.imageUrls
              .split(',')
              .map(url => url.trim())
              .filter(Boolean)
        };

        if (this.isEdit) {
          await WorkoutService.update(this.workout.id, payload);
          this.$toast.success('Workout updated');
        } else {
          await WorkoutService.create(payload);
          this.$toast.success('Workout created');
        }

        this.$emit('submitted');
      } catch (error) {
        console.error(error);
        this.$toast.error('Save failed');
      }
    }
  }
};
</script>
