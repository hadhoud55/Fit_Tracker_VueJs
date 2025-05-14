<template>
  <form @submit.prevent="submitProduct" class="bg-white p-6 rounded shadow-md">
    <div class="mb-4">
      <label for="name" class="block text-gray-700">Name</label>
      <input v-model="form.name" type="text" id="name" class="w-full p-2 border rounded" required />
    </div>
    <div class="mb-4">
      <label for="price" class="block text-gray-700">Price</label>
      <input v-model="form.price" type="number" step="0.01" id="price" class="w-full p-2 border rounded" required />
    </div>
    <div class="mb-4">
      <label for="stock" class="block text-gray-700">Stock</label>
      <input v-model="form.stock" type="number" id="stock" class="w-full p-2 border rounded" required />
    </div>
    <div class="mb-4">
      <label for="imageUrls" class="block text-gray-700">Image URLs (comma-separated)</label>
      <input v-model="form.imageUrls" type="text" id="imageUrls" class="w-full p-2 border rounded" />
    </div>
    <button type="submit" class="w-full bg-accent text-white py-2 rounded hover:bg-green-700">Save Product</button>
  </form>
</template>

<script>
import ProductService from '@/services/products.js';

export default {
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        name: '',
        price: '',
        stock: '',
        imageUrls: '',
      },
    };
  },
  created() {
    if (this.product) {
      this.form = {
        ...this.product,
        imageUrls: this.product.imageUrls ? this.product.imageUrls.join(',') : '',
      };
    }
  },
  methods: {
    async submitProduct() {
      try {
        const payload = {
          ...this.form,
          imageUrls: this.form.imageUrls ? this.form.imageUrls.split(',').map(url => url.trim()) : [],
        };
        if (this.product) {
          await ProductService.update(this.product.id, payload);
          this.$toast.success('Product updated');
        } else {
          await ProductService.create(payload);
          this.$toast.success('Product created');
        }
        this.$emit('submitted');
      } catch (error) {
        this.$toast.error('Failed to save product');
      }
    },
  },
};
</script>