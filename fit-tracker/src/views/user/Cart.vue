<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Shopping Cart</h1>
    <div v-if="cartItems.length === 0" class="text-gray-600">Your cart is empty.</div>
    <div v-else class="space-y-4">
      <CartItem
          v-for="item in cartItems"
          :key="item.product.id"
          :item="item"
          @updated="fetchCart"
          @remove="removeItem"
      />
      <div class="flex justify-end">
        <router-link to="/checkout" class="bg-accent text-white px-4 py-2 rounded hover:bg-green-700">
          Proceed to Checkout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '@/components/user/CartItem.vue';

export default {
  components: { CartItem },
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
  },
  methods: {
    fetchCart() {
      // No-op; cart is already in Vuex store
    },
    removeItem(productId) {
      try {
        this.$store.dispatch('removeFromCart', productId);
        this.$toast.success('Item removed');
      } catch (error) {
        this.$toast.error('Failed to remove item');
      }
    },
  },
};
</script>