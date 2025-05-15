<template>
  <div class="bg-white p-6 rounded shadow-md">
    <h2 class="text-xl font-bold text-primary mb-4">Order Summary</h2>
    <div v-for="item in items" :key="item.product.id" class="flex justify-between mb-2">
      <span>{{ item.product.name }} x {{ item.quantity }}</span>
      <span>${{ (item.product.price * item.quantity).toFixed(2) }}</span>
    </div>
    <div class="border-t pt-2 mt-2">
      <div class="flex justify-between font-semibold">
        <span>Total</span>
        <span>${{ total.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    total() {
      return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    },
  },
};
</script>