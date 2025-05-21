<template>
  <form @submit.prevent="submit" class="bg-white p-6 rounded shadow-md space-y-4">
    <div>
      <label class="block text-gray-700">Card Number</label>
      <input
          v-model="form.cardNumber"
          type="text"
          class="w-full p-2 border rounded"
          placeholder="1234 5678 9012 3456"
          required
      />
    </div>
    <div class="flex space-x-4">
      <div class="w-1/2">
        <label class="block text-gray-700">Expiry (MM/YY)</label>
        <input
            v-model="form.expiry"
            type="text"
            class="w-full p-2 border rounded"
            placeholder="MM/YY"
            required
        />
      </div>
      <div class="w-1/2">
        <label class="block text-gray-700">CVC</label>
        <input
            v-model="form.cvc"
            type="text"
            class="w-full p-2 border rounded"
            placeholder="123"
            required
        />
      </div>
    </div>
    <button
        type="submit"
        class="w-full bg-accent text-white py-2 rounded hover:bg-green-700"
    >
      Pay ${{ amount.toFixed(2) }}
    </button>
  </form>
</template>

<script>
import PaymentService from '@/services/payments.js';
export default {
  props: {
    orderId: { type: Number, required: true },
    amount:  { type: Number, required: true }
  },
  data() {
    return {
      form: {
        cardNumber: '',
        expiry: '',
        cvc: ''
      }
    };
  },
  methods: {
    async submit() {
      try {
        const payload = {
          orderId: this.orderId,
          amount: this.amount,
          paymentDate: new Date().toISOString(),
          status: 'PENDING',
          cardNumber: this.form.cardNumber,
          expiry: this.form.expiry,
          cvc: this.form.cvc
        };
        const res = await PaymentService.create(payload);
        // emit full response so parent can inspect cardLast4/status
        this.$emit('submitted', res);
      } catch (e) {
        this.$toast.error(e.response?.data?.message || 'Payment failed');
      }
    }
  }
};
</script>
