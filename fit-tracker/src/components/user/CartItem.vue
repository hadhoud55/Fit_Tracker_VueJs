<template>
  <div class="flex items-center justify-between bg-white p-4 rounded shadow">
    <div class="flex items-center">
      <img :src="item.product.imageUrls[0] || 'https://via.placeholder.com/100'" alt="Product" class="w-16 h-16 object-cover rounded" />
      <div class="ml-4">
        <h4 class="font-semibold text-primary">{{ item.product.name }}</h4>
        <p class="text-gray-600">${{ item.product.price.toFixed(2) }} x {{ item.quantity }}</p>
      </div>
    </div>
    <div class="flex items-center">
      <button @click="updateQuantity(item.quantity - 1)" class="px-2 py-1 bg-gray-200 rounded">-</button>
      <span class="mx-2">{{ item.quantity }}</span>
      <button @click="updateQuantity(item.quantity + 1)" class="px-2 py-1 bg-gray-200 rounded">+</button>
      <button @click="$emit('remove', item.product.id)" class="ml-4 text-red-600 hover:text-red-800">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateQuantity(quantity) {
      if (quantity < 1) {
        this.$emit('remove', this.item.product.id);
        return;
      }
      try {
        this.$store.dispatch('updateCartItem', { productId: this.item.product.id, quantity });
        this.$emit('updated');
        this.$toast.success('Cart updated');
      } catch (error) {
        this.$toast.error('Failed to update cart');
      }
    },
  },
};
</script>