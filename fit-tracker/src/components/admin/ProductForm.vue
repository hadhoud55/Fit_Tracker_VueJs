<template>
  <div class="ml-64 p-6">
    <h2 class="text-xl font-bold text-primary mb-4">
      {{ isEdit ? 'Edit' : 'New' }} Product
    </h2>
    <form @submit.prevent="submitProduct" class="space-y-4 bg-white p-6 rounded shadow-md">
      <div>
        <label class="block text-gray-700">Name</label>
        <input v-model="form.name" class="w-full p-2 border rounded" required />
      </div>
      <div>
        <label class="block text-gray-700">Price</label>
        <input v-model.number="form.price" type="number" step="0.01" class="w-full p-2 border rounded" required />
      </div>
      <div>
        <label class="block text-gray-700">Stock</label>
        <input v-model.number="form.stock" type="number" class="w-full p-2 border rounded" required />
      </div>
      <div>
        <label class="block text-gray-700">Image URLs</label>
        <input v-model="form.imageUrls" class="w-full p-2 border rounded" placeholder="url1,url2" />
      </div>
      <button type="submit" class="bg-accent text-white py-2 px-4 rounded hover:bg-green-700">
        Save Product
      </button>
    </form>
  </div>
</template>

<script>
import ProductService from '@/services/products.js';

export default {
  props: { product: { type: Object, default: null } },
  data() {
    return { form: { name:'', price:null, stock:null, imageUrls:'' } };
  },
  computed: { isEdit() { return !!this.product; } },
  created() {
    if (this.isEdit) {
      this.form = {
        ...this.product,
        imageUrls: this.product.imageUrls?.join(',') || ''
      };
    }
  },
  methods: {
    async submitProduct() {
      try {
        const payload = {
          ...this.form,
          imageUrls: this.form.imageUrls.split(',').map(u => u.trim())
        };
        if (this.isEdit) {
          await ProductService.update(this.product.id, payload);
          this.$toast.open({ message:'Product updated', type:'success' });
        } else {
          await ProductService.create(payload);
          this.$toast.open({ message:'Product created', type:'success' });
        }
        this.$emit('saved');
      } catch {
        this.$toast.open({ message:'Save failed', type:'error' });
      }
    }
  }
};
</script>
