<template>
  <form @submit.prevent="submitReview" class="bg-white p-6 rounded shadow-md">
    <div class="mb-4">
      <label for="rating" class="block text-gray-700">Rating</label>
      <select v-model="form.rating" id="rating" class="w-full p-2 border rounded" required>
        <option v-for="n in 5" :key="n" :value="n">{{ n }} Star{{ n > 1 ? 's' : '' }}</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="comment" class="block text-gray-700">Comment</label>
      <textarea v-model="form.comment" id="comment" class="w-full p-2 border rounded" required></textarea>
    </div>
    <button type="submit" class="w-full bg-accent text-white py-2 rounded hover:bg-green-700">Submit Review</button>
  </form>
</template>

<script>
import ReviewService from '@/services/reviews.js';

export default {
  props: {
    review: {
      type: Object,
      default: null,
    },
    classId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      form: {
        rating: 5,
        comment: '',
        classId: this.classId,
      },
    };
  },
  created() {
    if (this.review) {
      this.form = { ...this.review, classId: this.classId };
    }
  },
  methods: {
    async submitReview() {
      try {
        if (this.review) {
          await ReviewService.update(this.review.id, this.form);
          this.$toast.success('Review updated');
        } else {
          await ReviewService.create(this.form);
          this.$toast.success('Review submitted');
        }
        this.$emit('submitted');
      } catch (error) {
        this.$toast.error('Failed to save review');
      }
    },
  },
};
</script>