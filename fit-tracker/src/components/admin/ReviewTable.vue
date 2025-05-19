<template>
  <div class="overflow-x-auto ml-64 p-6">
    <h2 class="text-xl font-bold text-primary mb-4">Reviews</h2>
    <table class="w-full bg-white shadow-md rounded">
      <thead class="bg-gray-200">
      <tr>
        <th class="py-2 px-4 text-left">ID</th>
        <th class="py-2 px-4 text-left">User</th>
        <th class="py-2 px-4 text-left">Entity</th>
        <th class="py-2 px-4 text-left">Rating</th>
        <th class="py-2 px-4 text-left">Comment</th>
        <th class="py-2 px-4 text-left">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="r in reviews" :key="r.id" class="border-b">
        <td class="py-2 px-4">{{ r.id }}</td>
        <td class="py-2 px-4">{{ r.user.username }}</td>
        <td class="py-2 px-4">{{ r.entityName }}</td>
        <td class="py-2 px-4">{{ r.rating }}</td>
        <td class="py-2 px-4">{{ r.comment }}</td>
        <td class="py-2 px-4">
          <button @click="deleteReview(r.id)" class="text-red-600 hover:text-red-800">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ReviewService from '@/services/reviews.js';

export default {
  data() {
    return { reviews: [] };
  },
  async created() {
    try {
      this.reviews = await ReviewService.getAll({ page:0,size:100 });
    } catch {
      this.$toast.open({ message:'Failed to load reviews', type:'error' });
    }
  },
  methods: {
    async deleteReview(id) {
      try {
        await ReviewService.delete(id);
        this.reviews = this.reviews.filter(r => r.id !== id);
        this.$toast.open({ message:'Review deleted', type:'success' });
      } catch {
        this.$toast.open({ message:'Delete failed', type:'error' });
      }
    }
  }
};
</script>
