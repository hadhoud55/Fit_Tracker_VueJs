<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">Checkout</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 class="text-xl font-bold text-primary mb-4">Payment Details</h2>
        <PaymentForm :order-id="orderId" :total="total" @submitted="handlePayment" />
      </div>
      <OrderSummary :items="cartItems" />
    </div>
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
      try {
        const response = await OrderService.create({
          items: this.cartItems.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        });
        this.orderId = response.data.id;
      } catch (error) {
        this.$toast.error('Failed to create order');
      }
    },
    async handlePayment() {
      try {
        this.$store.dispatch('clearCart');
        this.$toast.success('Order placed successfully');
        this.$router.push('/orders');
      } catch (error) {
        this.$toast.error('Failed to complete order');
      }
    },
  },
};
</script>