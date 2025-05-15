<template>
  <form @submit.prevent="submitMembership" class="bg-white p-6 rounded shadow-md">
    <div class="mb-4">
      <label for="name" class="block text-gray-700">Name</label>
      <input v-model="form.name" type="text" id="name" class="w-full p-2 border rounded" required />
    </div>
    <div class="mb-4">
      <label for="price" class="block text-gray-700">Price</label>
      <input v-model="form.price" type="number" step="0.01" id="price" class="w-full p-2 border rounded" required />
    </div>
    <div class="mb-4">
      <label for="duration" class="block text-gray-700">Duration (days)</label>
      <input v-model="form.durationInDays" type="number" id="duration" class="w-full p-2 border rounded" required />
    </div>
    <button type="submit" class="w-full bg-accent text-white py-2 rounded hover:bg-green-700">Save Membership</button>
  </form>
</template>

<script>
import MembershipService from '@/services/memberships.js';

export default {
  props: {
    membership: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        name: '',
        price: '',
        durationInDays: '',
      },
    };
  },
  created() {
    if (this.membership) {
      this.form = { ...this.membership };
    }
  },
  methods: {
    async submitMembership() {
      try {
        if (this.membership) {
          await MembershipService.update(this.membership.id, this.form);
          this.$toast.success('Membership updated');
        } else {
          await MembershipService.create(this.form);
          this.$toast.success('Membership created');
        }
        this.$emit('submitted');
      } catch (error) {
        this.$toast.error('Failed to save membership');
      }
    },
  },
};
</script>