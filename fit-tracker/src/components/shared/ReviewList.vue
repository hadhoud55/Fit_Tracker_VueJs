<template>
  <div class="space-y-4">
    <div
        v-for="r in reviews"
        :key="r.id"
        class="bg-white p-4 rounded shadow flex justify-between"
    >
      <div>
        <p class="font-semibold text-primary">{{ r.user.username }}</p>
        <p class="text-gray-700">{{ r.comment }}</p>
      </div>
      <button
          v-if="r.user.id===userId"
          @click="deleteReview(r.id)"
          class="text-red-500 hover:underline"
      >Delete</button>
    </div>
    <Pagination
        :currentPage="page"
        :totalPages="totalPages"
        @page-changed="loadReviews"
    />
  </div>
</template>

<script>
import ReviewService from '@/services/reviews.js';
import Pagination   from './Pagination.vue';

export default {
  props: { workoutId:{type:Number, required:true} },
  components:{ Pagination },
  data(){ return { reviews:[], page:0, totalPages:1 }; },
  computed:{ userId:()=> JSON.parse(localStorage.getItem('user'))?.id },
  created(){ this.loadReviews(0); },
  methods:{
    async loadReviews(page) {
      this.page = page;
      try {
        const { content, totalPages } =
            await ReviewService.getForWorkout(this.workoutId, { page, size:5 });
        this.reviews = content;
        this.totalPages = totalPages;
      } catch {
        this.$toast.open({ message:'Load failed', type:'error' });
      }
    },
    async deleteReview(id) {
      try {
        await ReviewService.delete(id);
        this.$toast.open({ message:'Deleted', type:'success' });
        this.loadReviews(this.page);
      } catch {
        this.$toast.open({ message:'Delete failed', type:'error' });
      }
    }
  }
};
</script>
