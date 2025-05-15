<template>
  <nav class="bg-primary text-white shadow-lg">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/" class="text-2xl font-bold flex items-center">
        <img src="@/assets/logo.png" alt="Logo" class="h-8 mr-2" />
        FitTracker
      </router-link>

      <!-- Desktop Menu -->
      <div class="hidden md:flex space-x-6 items-center">
        <router-link to="/" class="hover:text-accent">Home</router-link>
        <router-link to="/memberships" class="hover:text-accent">Memberships</router-link>
        <router-link to="/products" class="hover:text-accent">Products</router-link>
        <router-link to="/classes" class="hover:text-accent">Classes</router-link>
        <router-link to="/workouts" class="hover:text-accent">Workouts</router-link>

        <!-- Authenticated User Links -->
        <template v-if="isAuthenticated">
          <router-link v-if="isUser" to="/user/dashboard" class="hover:text-accent">Dashboard</router-link>
          <router-link v-if="isCoach" to="/coach/dashboard" class="hover:text-accent">Coach Dashboard</router-link>
          <router-link v-if="isAdmin" to="/admin/users" class="hover:text-accent">Admin Dashboard</router-link>
          <button @click="logout" class="bg-accent hover:bg-green-700 px-4 py-2 rounded">Logout</button>
        </template>
        <!-- Guest Links -->
        <template v-else>
          <router-link to="/login" class="hover:text-accent">Login</router-link>
          <router-link to="/register" class="bg-accent hover:bg-green-700 px-4 py-2 rounded">Register</router-link>
        </template>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" class="md:hidden focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-primary py-2">
      <router-link to="/" class="block px-4 py-2 hover:bg-secondary" @click="toggleMobileMenu">Home</router-link>
      <router-link to="/memberships" class="block px-4 py-2 hover:bg-secondary" @click="toggleMobileMenu">Memberships</router-link>
      <router-link to="/products" class="block px-4 py-2 hover:bg-secondary" @click="toggleMobileMenu">Products</router-link>
      <router-link to="/classes" class="block px-4 py-2 hover:bg-secondary" @click="toggleMobileMenu">Classes</router-link>
      <router-link to="/workouts" class="block px-4 py-2 hover:bg-secondary" @click="toggleMobileMenu">Workouts</router-link>
      <template v-if="isAuthenticated">
        <router-link v-if="isUser" to="/user/dashboard" class="block px-4 py-2 hover:bg-secondary" @click="toggleMobileMenu">Dashboard</router-link>
        <router-link v-if="isCoach" to="/coach/dashboard" class="block px-4 py-2 hover:bg-secondary" @click="toggleMobileMenu">Coach Dashboard</router-link>
        <router-link v-if="isAdmin" to="/admin/users" class="block px-4 py-2 hover:bg-secondary" @click="toggleMobileMenu">Admin Dashboard</router-link>
        <button @click="logout" class="block w-full text-left px-4 py-2 hover:bg-secondary">Logout</button>
      </template>
      <template v-else>
        <router-link to="/login" class="block px-4 py-2 hover:bg-secondary" @click="toggleMobileMenu">Login</router-link>
        <router-link to="/register" class="block px-4 py-2 hover:bg-secondary" @click="toggleMobileMenu">Register</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import AuthService from '@/services/auth.js';

export default {
  data() {
    return {
      mobileMenuOpen: false,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'userRole']),
    isUser() {
      return this.userRole === 'USER';
    },
    isCoach() {
      return this.userRole === 'COACH';
    },
    isAdmin() {
      return this.userRole === 'ADMIN';
    },
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    async logout() {
      try {
        await AuthService.logout();
        this.$store.dispatch('logout');
        this.$router.push('/login');
        this.$toast.success('Logged out successfully');
      } catch (error) {
        this.$toast.error('Logout failed');
      }
    },
  },
};
</script>