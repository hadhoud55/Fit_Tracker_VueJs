<template>
  <div class="border rounded-lg p-4 shadow hover:shadow-lg transition">
    <img
        :src="workout.imageUrls[0] || placeholder"
        alt="Workout"
        class="w-full h-40 object-cover rounded"
    />
    <h3 class="mt-2 text-lg font-semibold">{{ workout.name }}</h3>
    <p class="text-gray-600">{{ workout.category }}</p>
    <div class="mt-4 flex justify-between">
      <button
          @click="$emit('edit', workout)"
          class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
      >
        Edit
      </button>
      <button
          @click="$emit('delete', workout)"
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminWorkoutCard',
  props: {
    workout: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      placeholder: 'https://via.placeholder.com/300'
    };
  }
};
</script>
