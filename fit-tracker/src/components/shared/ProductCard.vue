<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
    <img :src="product.imageUrls[0] || 'https://via.placeholder.com/300'" alt="Product" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-lg font-semibold text-primary">{{ product.name }}</h3>
      <p class="text-gray-600">${{ product.price.toFixed(2) }}</p>
      <p class="text-sm text-gray-500">Stock: {{ product.stock }}</p>
      <button
          @click="addToCart"
          :disabled="product.stock <= 0"
          class="mt-2 w-full bg-accent text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart() {
      try {
        this.$store.dispatch('addToCart', { product: this.product, quantity: 1 });
        this.$toast.success('Added to cart');
        this.$emit('cart-updated');
      } catch (error) {
        this.$toast.error('Failed to add to cart');
      }
    },
  },
};
</script>