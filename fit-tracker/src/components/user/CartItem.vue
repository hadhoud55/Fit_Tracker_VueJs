<template>
  <div class="flex items-center justify-between bg-white p-4 rounded shadow">
    <div class="flex items-center">
      <img
          :src="item.product.imageUrls?.[0]||placeholder"
          alt=""
          class="w-16 h-16 object-cover rounded"
      />
      <div class="ml-4">
        <h4 class="font-semibold text-primary">{{ item.product.name }}</h4>
        <p class="text-gray-600">${{ item.product.price.toFixed(2) }} x {{ item.quantity }}</p>
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <button @click="changeQty(item.quantity-1)" class="px-2 py-1 bg-gray-200 rounded">–</button>
      <span>{{ item.quantity }}</span>
      <button @click="changeQty(item.quantity+1)" class="px-2 py-1 bg-gray-200 rounded">＋</button>
      <button @click="$emit('remove', item.product.id)" class="ml-4 text-red-600 hover:text-red-800">
        Remove
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type:Object, required:true }
  },
  data() {
    return { placeholder:'https://via.placeholder.com/100' };
  },
  methods: {
    changeQty(q) {
      if (q < 1) {
        this.$emit('remove', this.item.product.id);
      } else {
        this.$store.dispatch('updateCartItem', {
          productId:this.item.product.id,
          quantity:q
        });
        this.$emit('update');
        this.$toast.open({ message:'Cart updated', type:'success' });
      }
    }
  }
};
</script>
