<template>
  <div class="border rounded-lg p-4 shadow hover:shadow-lg transition">
    <h3 class="text-lg font-semibold">{{ gymClass.name }}</h3>
    <p class="text-gray-600">{{ gymClass.schedule }}</p>
    <div class="mt-4 flex justify-between">
      <router-link
          :to="{ name:'ClassDetail', params:{ id:gymClass.id }}"
          class="text-blue-500 hover:underline"
      >Details</router-link>
      <button
          @click="bookClass"
          class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
      >Book</button>
    </div>
  </div>
</template>

<script>
import BookingService from '@/services/bookings.js';
export default {
  props: { gymClass: { type:Object, required:true } },
  methods: {
    async bookClass() {
      try {
        const userId = this.$store.getters.userId;
        await BookingService.create({ classId:this.gymClass.id, userId });
        this.$toast.open({ message:'Booked!', type:'success' });
      } catch {
        this.$toast.open({ message:'Booking failed', type:'error' });
      }
    }
  }
};
</script>
