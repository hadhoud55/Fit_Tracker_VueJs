<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">{{ gymClass?.title }}</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
    <div v-else class="bg-white p-6 rounded shadow-md">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 class="text-xl font-semibold text-primary">Class Details</h2>
          <p><strong>Category:</strong> {{ gymClass.category || 'N/A' }}</p>
          <p><strong>Description:</strong> {{ gymClass.description || 'N/A' }}</p>
          <p><strong>Start Time:</strong> {{ formatDate(gymClass.startTime) }}</p>
          <p><strong>End Time:</strong> {{ formatDate(gymClass.endTime) }}</p>
          <p><strong>Duration:</strong> {{ gymClass.duration }} minutes</p>
          <p><strong>Capacity:</strong> {{ gymClass.capacity }}</p>
          <p><strong>Coach:</strong> {{ gymClass.coachName }}</p>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-primary">Images</h2>
          <div v-if="gymClass.imageUrls?.length" class="flex flex-wrap gap-2">
            <img
                v-for="(url, index) in gymClass.imageUrls"
                :key="index"
                :src="url"
                alt="Class Image"
                class="w-32 h-32 object-cover rounded"
            />
          </div>
          <p v-else>No images available</p>
        </div>
      </div>
      <div class="mt-6">
        <h2 class="text-xl font-semibold text-primary">Workouts</h2>
        <ul class="list-disc pl-5">
          <li v-for="workoutId in gymClass.workoutIds" :key="workoutId">Workout ID: {{ workoutId }}</li>
        </ul>
      </div>
      <div v-if="isAuthenticated" class="mt-6">
        <BookingForm :classId="gymClass.id" @booking-success="handleBookingSuccess" />
      </div>
      <div v-else class="mt-6">
        <p class="text-red-500">Please <router-link to="/login" class="text-accent hover:underline">log in</router-link> to book this class.</p>
      </div>
    </div>
  </div>
</template>

<script>
import ClassService from '@/services/classes.js';
import BookingForm from '@/components/user/BookingForm.vue';
import { mapGetters } from 'vuex';

export default {
  components: { BookingForm },
  data() {
    return {
      gymClass: null,
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    async fetchClass() {
      this.loading = true;
      this.error = null;
      try {
        this.gymClass = await ClassService.getById(this.$route.params.id);
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to load class';
        this.$toast.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    handleBookingSuccess() {
      this.$toast.success('Class booked successfully');
      this.$router.push('/user/bookings');
    },
  },
  created() {
    this.fetchClass();
  },
};
</script>