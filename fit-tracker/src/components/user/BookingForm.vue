<template>
  <form @submit.prevent="submit" class="grid gap-4 bg-white p-6 rounded shadow-md">
    <div>
      <label for="classId" class="block text-gray-700">Class</label>
      <select
          v-model.number="form.classId"
          id="classId"
          class="w-full p-2 border rounded"
          required
      >
        <option disabled value="">Select a class</option>
        <option v-for="c in classes" :key="c.id" :value="c.id">
          {{ c.title }} — {{ formatDate(c.startTime) }}
        </option>
      </select>
    </div>

    <div>
      <label for="bookingDate" class="block text-gray-700">Booking Date</label>
      <input
          v-model="form.bookingDate"
          type="datetime-local"
          id="bookingDate"
          class="w-full p-2 border rounded"
          :min="minDateTime"
      />
    </div>

    <div class="flex justify-end">
      <button
          type="submit"
          class="bg-accent text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
          :disabled="!form.classId"
      >
        {{ isEdit ? 'Update' : 'Book' }}
      </button>
    </div>
  </form>
</template>

<script>
import BookingService from '@/services/bookings.js';
import ClassService   from '@/services/classes.js';
export default {
  props: {
    bookingData: { type: Object, default: null }
  },
  data() {
    return {
      form: {
        classId: null,
        bookingDate: ''
      },
      classes: []
    };
  },
  computed: {
    isEdit() { return !!this.bookingData; },
    minDateTime() { return new Date().toISOString().slice(0,16); }
  },
  async created() {
    // load available classes
    try {
      const resp = await ClassService.getClasses({ page:0,size:100 });
      this.classes = resp.content;
    } catch {
      this.$toast.open({ message:'Failed to load classes', type:'error' });
    }
    if (this.isEdit) {
      this.form = {
        classId: this.bookingData.classId,
        bookingDate: this.bookingData.bookingDate
            ? new Date(this.bookingData.bookingDate).toISOString().slice(0,16)
            : ''
      };
    }
  },
  methods: {
    formatDate(dt) { return new Date(dt).toLocaleString(); },
    async submit() {
      try {
        const payload = {
          classId: this.form.classId,
          bookingDate: this.form.bookingDate
              ? new Date(this.form.bookingDate).toISOString()
              : null
        };
        if (this.isEdit) {
          await BookingService.update(this.bookingData.id, payload);
          this.$emit('updated');
          this.$toast.open({ message:'Booking updated', type:'success' });
        } else {
          await BookingService.create(payload);
          this.$emit('created');
          this.$toast.open({ message:'Booked successfully', type:'success' });
        }
      } catch (err) {
        this.$toast.open({ message: err.message||'Booking failed', type:'error' });
      }
    }
  }
};
</script>
