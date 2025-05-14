<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Manage Products</h1>
    <ProductForm v-if="showForm" :product="selectedProduct" @submitted="fetchProducts" class="mb-6" />
    <button
        v-else
        @click="showForm = true"
        class="mb-6 bg-accent text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Create Product
    </button>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" @cart-updated="fetchProducts" />
    </div>
    <Pagination :total-pages="totalPages" :current-page="currentPage" @page-changed="fetchProducts" />
  </div>
</template>

<script>
import ProductForm from '@/components/admin/ProductForm.vue';
import ProductCard from '@/components/shared/ProductCard.vue';
import ProductService from '@/services/products.js';
import Pagination from "@/components/shared/Pagination.vue";

export default {
  components: {Pagination, ProductForm, ProductCard },
  data() {
    return {
      products: [],
      showForm: false,
      selectedProduct: null,
      currentPage: 0,
      totalPages: 0,
    };
  },
  async created() {
    await this.fetchProducts(0);
  },
  methods: {
    async fetchProducts(page) {
      try {
        const response = await ProductService.getAll(page, 9);
        this.products = response.data.content;
        this.totalPages = response.data.totalPages;
        this.currentPage = page;
        this.showForm = false;
        this.selectedProduct = null;
      } catch (error) {
        this.$toast.error('Failed to load products');
      }
    },
    editProduct(product) {
      this.selectedProduct = product;
      this.showForm = true;
    },
  },
};
</script>