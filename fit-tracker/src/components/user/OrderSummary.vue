<template>
  <div class="bg-white p-6 rounded shadow-md">
    <h2 class="text-xl font-bold text-primary mb-4">Order Summary</h2>
    <div v-for="i in items" :key="i.product.id" class="flex justify-between mb-2">
      <span>{{ i.product.name }} x {{ i.quantity }}</span>
      <span>${{ (i.product.price * i.quantity).toFixed(2) }}</span>
    </div>
    <div class="border-t pt-2 mt-2 flex justify-between font-semibold">
      <span>Total</span>
      <span>${{ total.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: { type:Array, required:true }
  },
  computed: {
    total() {
      return this.items.reduce(
          (sum, i) => sum + i.product.price * i.quantity, 0
      );
    }
  }
};
</script>
