<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Products</h1>
    <div class="mb-4">
      <input v-model="search" type="text" placeholder="Search products..." class="w-full p-2 border rounded" @input="fetchProducts" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" @cart-updated="fetchProducts" />
    </div>
    <Pagination :total-pages="totalPages" :current-page="currentPage" @page-changed="fetchProducts" />
  </div>
</template>

<script>
import Pagination from '@/components/shared/Pagination.vue';
import ProductCard from '@/components/shared/ProductCard.vue';
import ProductService from '@/services/products.js';

export default {
  components: {Pagination, ProductCard },
  data() {
    return {
      products: [],
      search: '',
      currentPage: 0,
      totalPages: 0,
    };
  },
  async created() {
    await this.fetchProducts(0);
  },
  methods: {
    async fetchProducts(page = this.currentPage) {
      try {
        const response = await ProductService.searchProducts(this.search, page, 9);
        this.products = response.data.content;
        this.totalPages = response.data.totalPages;
        this.currentPage = page;
      } catch (error) {
        this.$toast.error('Failed to load products');
      }
    },
  },
};
</script>