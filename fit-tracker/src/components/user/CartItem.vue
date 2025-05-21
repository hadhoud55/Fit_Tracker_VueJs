<template>
  <div class="flex items-center justify-between bg-white p-4 rounded shadow">
    <div class="flex items-center">
      <img
          :src="item.product.imageUrls?.[0] || placeholder"
          alt="Product image"
          class="w-24 h-24 object-contain rounded border"
      />
      <div class="ml-4">
        <h4 class="font-semibold text-primary">{{ item.product.name }}</h4>
        <p class="text-gray-600">
          ${{ item.product.price.toFixed(2) }} × {{ item.quantity }}
        </p>
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <button
          @click="changeQty(item.quantity - 1)"
          class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >–</button>
      <span class="w-6 text-center">{{ item.quantity }}</span>
      <button
          @click="changeQty(item.quantity + 1)"
          class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >＋</button>
      <button
          @click="$emit('remove', item.product.id)"
          class="ml-4 text-red-600 hover:text-red-800"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true }
  },
  data() {
    return {
      placeholder: 'https://via.placeholder.com/200'
    };
  },
  methods: {
    changeQty(newQty) {
      if (newQty < 1) return;
      if (newQty > this.item.product.stock) {
        this.$toast.error('Not enough stock available');
        return;
      }
      this.$store.dispatch('updateCartItem', {
        productId: this.item.product.id,
        quantity: newQty
      });
    }
  }
};
</script>
