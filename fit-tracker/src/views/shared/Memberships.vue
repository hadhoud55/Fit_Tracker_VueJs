<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Memberships</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="membership in memberships" :key="membership.id" class="bg-white p-6 rounded shadow-md">
        <h2 class="text-xl font-semibold text-primary">{{ membership.name }}</h2>
        <p class="text-gray-600">{{ membership.description }}</p>
        <p class="mt-2"><strong>Type:</strong> {{ membership.type }}</p>
        <p><strong>Price:</strong> ${{ membership.price.toFixed(2) }}</p>
        <p><strong>Duration:</strong> {{ membership.duration }} days</p>
        <p><strong>Status:</strong> {{ membership.active ? 'Active' : 'Inactive' }}</p>
        <button
            v-if="isAuthenticated"
            @click="addToCart(membership)"
            class="mt-4 bg-accent text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MembershipService from '@/services/memberships.js';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      memberships: [],
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'userId']),
  },
  methods: {
    ...mapActions(['addToCart']),
    async fetchMemberships() {
      this.loading = true;
      this.error = null;
      try {
        this.memberships = await MembershipService.getAll();
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to load memberships';
        this.$toast.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    addToCart(membership) {
      const product = {
        id: `membership-${membership.id}`,
        name: membership.name,
        price: membership.price,
        type: 'membership',
      };
      this.addToCart({ product, quantity: 1 });
      this.$toast.success(`${membership.name} added to cart`);
    },
  },
  created() {
    this.fetchMemberships();
  },
};
</script>