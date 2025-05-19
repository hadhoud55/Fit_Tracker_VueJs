<template>
  <form @submit.prevent="submitPayment" class="bg-white p-6 rounded shadow-md space-y-4">
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
    >Pay Now</button>
  </form>
</template>

<script>
import PaymentService from '@/services/payments.js';
export default {
  props: {
    orderId:   { type:Number, required:true },
    orderTotal:{ type:Number, required:true }
  },
  data() {
    return {
      form: { cardNumber:'', expiry:'', cvc:'' }
    };
  },
  methods: {
    async submitPayment() {
      try {
        await PaymentService.create({
          orderId: this.orderId,
          amount:  this.orderTotal,
          cardNumber: this.form.cardNumber,
          expiry:     this.form.expiry,
          cvc:        this.form.cvc
        });
        this.$toast.open({ message:'Payment successful', type:'success' });
        this.$emit('paid');
      } catch (err) {
        this.$toast.open({ message:err.message||'Payment failed', type:'error' });
      }
    }
  }
};
</script>
