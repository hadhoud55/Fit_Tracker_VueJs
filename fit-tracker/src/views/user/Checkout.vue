<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Checkout</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6" v-if="orderId">
      <div>
        <h2 class="text-xl font-bold text-primary mb-4">Payment Details</h2>
        <PaymentForm :order-id="orderId" :total="total" @submitted="status => handlePayment(status)" />
      </div>
      <OrderSummary :items="cartItems" />
    </div>
    <div v-else class="text-center text-gray-500 py-10">Creating order...</div>
  </div>
</template>

<script>
import PaymentForm from '@/components/user/PaymentForm.vue';
import OrderSummary from '@/components/user/OrderSummary.vue';
import OrderService from '@/services/orders.js';

export default {
  components: { PaymentForm, OrderSummary },
  data() {
    return {
      orderId: null,
    };
  },
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
    total() {
      return this.$store.getters.cartTotal;
    },
  },
  async created() {
    await this.createOrder();
  },
  methods: {
    async createOrder() {
      if (this.cartItems.length === 0) {
        this.$toast.error('Your cart is empty.');
        this.$router.push('/cart');
        return;
      }
      try {
        const payload = {
          items: this.cartItems.map(i => ({
            productId: i.product.id,
            quantity: i.quantity
          }))
        };
        const response = await OrderService.create(payload);
        this.orderId = response.id; // Assuming response.id is returned
      } catch (error) {
        this.$toast.error(error.response?.data?.message || 'Failed to create order');
        this.$router.push('/cart');
      }
    },
    handlePayment(status) {
      if (status === 'COMPLETED') {
        this.$store.dispatch('clearCart');
        this.$toast.success('Payment successful');
        this.$router.push('/orders');
      } else {
        this.$toast.error(`Payment status: ${status}. Please try again.`);
      }
    }
  }
};
</script>