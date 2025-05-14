<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">{{ product.name }}</h1>
    <div class="bg-white p-6 rounded shadow-md">
      <img :src="product.imageUrls[0] || 'https://via.placeholder.com/600'" alt="Product" class="w-full h-64 object-cover rounded mb-4" />
      <p class="text-gray-600 mb-2">Price: ${{ product.price.toFixed(2) }}</p>
      <p class="text-gray-600 mb-2">Stock: {{ product.stock }}</p>
      <p class="text-gray-700">{{ product.description || 'No description available.' }}</p>
      <button
          @click="addToCart"
          :disabled="product.stock <= 0"
          class="mt-4 w-full bg-accent text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
      </button>
    </div>
  </div>
</template>

<script>
import ProductService from '@/services/products.js';

export default {
  data() {
    return {
      product: {},
    };
  },
  async created() {
    try {
      const response = await ProductService.getById(this.$route.params.id);
      this.product = response.data;
    } catch (error) {
      this.$toast.error('Failed to load product');
      this.$router.push('/products');
    }
  },
  methods: {
    addToCart() {
      try {
        this.$store.dispatch('addToCart', { product: this.product, quantity: 1 });
        this.$toast.success('Added to cart');
      } catch (error) {
        this.$toast.error('Failed to add to cart');
      }
    },
  },
};
</script>