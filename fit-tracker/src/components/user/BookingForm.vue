<template>
  <form @submit.prevent="submit" class="grid grid-cols-1 gap-4">
    <div>
      <label for="userId" class="block text-gray-700">User ID</label>
      <input
          v-model.number="form.userId"
          type="number"
          id="userId"
          class="w-full p-2 border rounded"
          min="1"
          required
      />
      <p v-if="errors.userId" class="text-red-500 text-sm">{{ errors.userId }}</p>
    </div>
    <div>
      <label for="classId" class="block text-gray-700">Class ID</label>
      <input
          v-model.number="form.classId"
          type="number"
          id="classId"
          class="w-full p-2 border rounded"
          min="1"
          required
      />
      <p v-if="errors.classId" class="text-red-500 text-sm">{{ errors.classId }}</p>
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
      <p v-if="errors.bookingDate" class="text-red-500 text-sm">{{ errors.bookingDate }}</p>
    </div>
    <div>
      <label for="status" class="block text-gray-700">Status</label>
      <select v-model="form.status" id="status" class="w-full p-2 border rounded">
        <option value="PENDING">Pending</option>
        <option value="CONFIRMED">Confirmed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
    </div>
    <div class="flex justify-end">
      <button
          type="submit"
          class="bg-accent text-white py-2 px-4 rounded hover:bg-green-700"
          :disabled="hasErrors"
      >
        {{ isEditMode ? 'Update' : 'Create' }} Booking
      </button>
    </div>
  </form>
</template>

<script>
import BookingService from '@/services/bookings.js';
import { mapGetters } from 'vuex';

export default {
  props: {
    bookingData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        userId: null,
        classId: null,
        bookingDate: '',
        status: 'PENDING',
      },
      errors: {
        userId: '',
        classId: '',
        bookingDate: '',
      },
    };
  },
  computed: {
    ...mapGetters(['userId', 'userRole']),
    isEditMode() {
      return !!this.bookingData;
    },
    minDateTime() {
      return new Date().toISOString().slice(0, 16);
    },
    hasErrors() {
      return Object.values(this.errors).some(error => error !== '');
    },
  },
  methods: {
    validateForm() {
      this.errors = {
        userId: '',
        classId: '',
        bookingDate: '',
      };
      let isValid = true;

      if (!this.form.userId || this.form.userId <= 0) {
        this.errors.userId = 'Valid User ID is required';
        isValid = false;
      }

      if (!this.form.classId || this.form.classId <= 0) {
        this.errors.classId = 'Valid Class ID is required';
        isValid = false;
      }

      const bookingDate = this.form.bookingDate ? new Date(this.form.bookingDate) : null;
      if (bookingDate && bookingDate < new Date()) {
        this.errors.bookingDate = 'Booking date must be present or future';
        isValid = false;
      }

      return isValid;
    },
    async submit() {
      if (!this.validateForm()) {
        this.$toast.error('Please fix the form errors');
        return;
      }

      try {
        const payload = {
          ...this.form,
          bookingDate: this.form.bookingDate ? new Date(this.form.bookingDate).toISOString() : null,
        };

        if (this.isEditMode) {
          await BookingService.update(this.bookingData.id, payload);
          this.$emit('booking-updated');
          this.$toast.success('Booking updated successfully');
        } else {
          await BookingService.create(payload);
          this.$emit('booking-created');
          this.$toast.success('Booking created successfully');
        }
        this.resetForm();
      } catch (error) {
        this.$toast.error(error.message || 'Failed to save booking');
      }
    },
    resetForm() {
      this.form = {
        userId: null,
        classId: null,
        bookingDate: '',
        status: 'PENDING',
      };
      this.errors = {
        userId: '',
        classId: '',
        bookingDate: '',
      };
    },
  },
  created() {
    if (this.bookingData) {
      this.form = {
        userId: this.bookingData.userId,
        classId: this.bookingData.classId,
        bookingDate: this.bookingData.bookingDate
            ? new Date(this.bookingData.bookingDate).toISOString().slice(0, 16)
            : '',
        status: this.bookingData.status,
      };
    }
  },
};
</script>