<template>
  <form @submit.prevent="submitPayment" class="bg-white p-6 rounded shadow-md">
    <div class="mb-4">
      <label for="cardNumber" class="block text-gray-700">Card Number</label>
      <input v-model="form.cardNumber" type="text" id="cardNumber" class="w-full p-2 border rounded" placeholder="1234 5678 9012 3456" required />
    </div>
    <div class="mb-4 flex space-x-4">
      <div class="w-1/2">
        <label for="expiry" class="block text-gray-700">Expiry</label>
        <input v-model="form.expiry" type="text" id="expiry" class="w-full p-2 border rounded" placeholder="MM/YY" required />
      </div>
      <div class="w-1/2">
        <label for="cvc" class="block text-gray-700">CVC</label>
        <input v-model="form.cvc" type="text" id="cvc" class="w-full p-2 border rounded" placeholder="123" required />
      </div>
    </div>
    <button type="submit" class="w-full bg-accent text-white py-2 rounded hover:bg-green-700">Pay Now</button>
  </form>
</template>

<script>
import PaymentService from '@/services/payments.js';

export default {
  props: {
    orderId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      form: {
        cardNumber: '',
        expiry: '',
        cvc: '',
      },
    };
  },
  methods: {
    async submitPayment() {
      try {
        await PaymentService.create({ orderId: this.orderId, amount: this.$attrs.total });
        this.$toast.success('Payment successful');
        this.$emit('submitted');
      } catch (error) {
        this.$toast.error('Payment failed');
      }
    },
  },
};
</script>