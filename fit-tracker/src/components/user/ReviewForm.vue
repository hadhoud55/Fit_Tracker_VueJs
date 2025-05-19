<template>
  <form @submit.prevent="submitReview" class="bg-white p-6 rounded shadow-md space-y-4">
    <div>
      <label for="rating" class="block text-gray-700">Rating</label>
      <select
          id="rating"
          v-model.number="form.rating"
          class="w-full p-2 border rounded"
          required
      >
        <option v-for="n in 5" :key="n" :value="n">{{ n }} Star{{ n>1?'s':'' }}</option>
      </select>
    </div>
    <div>
      <label for="comment" class="block text-gray-700">Comment</label>
      <textarea
          id="comment"
          v-model="form.comment"
          class="w-full p-2 border rounded"
          rows="3"
          required
      ></textarea>
    </div>
    <div class="flex justify-end">
      <button
          type="submit"
          class="bg-accent text-white py-2 px-4 rounded hover:bg-green-700"
      >
        {{ isEdit?'Update':'Submit' }} Review
      </button>
    </div>
  </form>
</template>

<script>
import ReviewService from '@/services/reviews.js';
export default {
  props: {
    workoutId:   { type:Number, required:true },
    existing:    { type:Object, default:null }
  },
  data() {
    return {
      form: {
        rating: 5,
        comment:'',
        workoutId: this.workoutId
      }
    };
  },
  computed: {
    isEdit() { return !!this.existing; }
  },
  created() {
    if (this.isEdit) this.form = { ...this.existing, workoutId:this.workoutId };
  },
  methods: {
    async submitReview() {
      try {
        if (this.isEdit) {
          await ReviewService.update(this.form.id, this.form);
          this.$toast.open({ message:'Review updated', type:'success' });
        } else {
          await ReviewService.create(this.form);
          this.$toast.open({ message:'Review submitted', type:'success' });
        }
        this.$emit('done');
      } catch (err) {
        this.$toast.open({ message:err.message||'Failed to save review', type:'error' });
      }
    }
  }
};
</script>
