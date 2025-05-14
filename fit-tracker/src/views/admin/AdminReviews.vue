<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Manage Reviews</h1>
    <ReviewTable
        :reviews="reviews"
        @delete="deleteReview"
    />
    <Pagination :total-pages="totalPages" :current-page="currentPage" @page-changed="fetchReviews" />
  </div>
</template>

<script>
import ReviewTable from '@/components/admin/ReviewTable.vue';
import ReviewService from '@/services/reviews.js';
import Pagination from "@/components/shared/Pagination.vue";

export default {
  components: {Pagination, ReviewTable },
  data() {
    return {
      reviews: [],
      currentPage: 0,
      totalPages: 0,
    };
  },
  async created() {
    await this.fetchReviews(0);
  },
  methods: {
    async fetchReviews(page) {
      try {
        const response = await ReviewService.getAll(page, 10);
        this.reviews = response.data.content;
        this.totalPages = response.data.totalPages;
        this.currentPage = page;
      } catch (error) {
        this.$toast.error('Failed to load reviews');
      }
    },
    async deleteReview(id) {
      try {
        await ReviewService.delete(id);
        this.$toast.success('Review deleted');
        await this.fetchReviews(this.currentPage);
      } catch (error) {
        this.$toast.error('Failed to delete review');
      }
    },
  },
};
</script>