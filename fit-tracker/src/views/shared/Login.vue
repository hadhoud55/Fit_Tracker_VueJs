<template>
  <div class="container mx-auto px-4 py-8 max-w-md">
    <h1 class="text-2xl font-bold text-primary mb-6">Login</h1>
    <form @submit.prevent="login" class="bg-white p-6 rounded shadow-md">
      <div class="mb-4">
        <label for="username" class="block text-gray-700">Username</label>
        <input v-model="form.username" type="text" id="username" class="w-full p-2 border rounded" required />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password</label>
        <input v-model="form.password" type="password" id="password" class="w-full p-2 border rounded" chimney />
      </div>
      <button type="submit" class="w-full bg-accent text-white py-2 rounded hover:bg-green-700">Login</button>
    </form>
    <p class="mt-4 text-center">
      Don't have an account? <router-link to="/register" class="text-accent hover:underline">Register</router-link>
    </p>
  </div>
</template>

<script>
import AuthService from '@/services/auth.js';

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', this.form);
        this.$toast.success('Logged in successfully');
        const redirect = this.$route.query.redirect || '/';
        this.$router.push(redirect);
      } catch (error) {
        this.$toast.error('Login failed: Invalid credentials');
      }
    },
  },
};
</script>