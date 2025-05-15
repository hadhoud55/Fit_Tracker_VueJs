<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">My Bookings</h1>
    <BookingForm v-if="showForm" :booking="selectedBooking" @submitted="fetchBookings" class="mb-6" />
    <BookingList
        :bookings="bookings"
        @edit="editBooking"
        @delete="deleteBooking"
    />
    <Pagination :total-pages="totalPages" :current-page="currentPage" @page-changed="fetchBookings" />
  </div>
</template>

<script>
import BookingForm from '@/components/user/BookingForm.vue';
import BookingList from '@/components/user/BookingList.vue';
import BookingService from '@/services/bookings.js';
import Pagination from "@/components/shared/Pagination.vue";

export default {
  components: {Pagination, BookingForm, BookingList },
  data() {
    return {
      bookings: [],
      showForm: false,
      selectedBooking: null,
      currentPage: 0,
      totalPages: 0,
    };
  },
  async created() {
    await this.fetchBookings(0);
  },
  methods: {
    async fetchBookings(page) {
      try {
        const response = await BookingService.getByUserId(this.$store.getters.userId, page, 10);
        this.bookings = response.data.content;
        this.totalPages = response.data.totalPages;
        this.currentPage = page;
        this.showForm = false;
        this.selectedBooking = null;
      } catch (error) {
        this.$toast.error('Failed to load bookings');
      }
    },
    editBooking(booking) {
      this.selectedBooking = booking;
      this.showForm = true;
    },
    async deleteBooking(id) {
      try {
        await BookingService.delete(id);
        this.$toast.success('Booking cancelled');
        await this.fetchBookings(this.currentPage);
      } catch (error) {
        this.$toast.error('Failed to cancel booking');
      }
    },
  },
};
</script>