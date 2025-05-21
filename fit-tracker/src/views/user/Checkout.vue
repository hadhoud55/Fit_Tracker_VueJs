<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Checkout</h1>
    <div v-if="!orderId" class="text-center text-gray-500 py-10">
      Creating order...
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 class="text-xl font-bold mb-4">Payment Details</h2>
        <PaymentForm
            :order-id="orderId"
            :amount="total"
            @submitted="handlePayment"
        ></PaymentForm>
      </div>
      <OrderSummary :items="cartItems"></OrderSummary>
    </div>
  </div>
</template>

<script>
import OrderService   from '@/services/orders.js';
import PaymentForm    from '@/components/user/PaymentForm.vue';
import OrderSummary   from '@/components/user/OrderSummary.vue';

export default {
  components: { PaymentForm, OrderSummary },
  data() {
    return { orderId: null };
  },
  computed: {
    cartItems() { return this.$store.getters.cartItems; },
    total()     { return this.$store.getters.cartTotal; }
  },
  async created() {
    if (!this.cartItems.length) {
      this.$toast.error('Your cart is empty.');
      return this.$router.push('/cart');
    }
    try {
      const order = await OrderService.create({
        items: this.cartItems.map(i => ({
          productId: i.product.id,
          quantity: i.quantity
        }))
      });
      // Clear cart right after order creation
      this.$store.dispatch('clearCart');
      this.orderId = order.id;
    } catch (e) {
      this.$toast.error(e.response?.data?.message || 'Failed to create order');
      this.$router.push('/cart');
    }
  },
  methods: {
    handlePayment(status) {
      if (status === 'COMPLETED') {
        this.$toast.success('Payment successful');
        this.$router.push('/orders');
      } else {
        this.$toast.error(`Payment status: ${status}`);
      }
    }
  }
};
</script>
