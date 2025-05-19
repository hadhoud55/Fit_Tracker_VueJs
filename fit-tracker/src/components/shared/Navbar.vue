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

        <template v-if="isAuthenticated">
          <!-- dynamic dashboard link -->
          <router-link
              :to="dashboardRoute"
              class="hover:text-accent"
          >
            {{ dashboardLabel }}
          </router-link>
          <button
              @click="handleLogout"
              class="bg-accent hover:bg-green-700 px-4 py-2 rounded"
          >Logout</button>
        </template>

        <template v-else>
          <router-link to="/login" class="hover:text-accent">Login</router-link>
          <router-link
              to="/register"
              class="bg-accent hover:bg-green-700 px-4 py-2 rounded"
          >Register</router-link>
        </template>
      </div>

      <!-- Mobile Toggle -->
      <button @click="mobileOpen = !mobileOpen" class="md:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor">
          <path
              v-if="!mobileOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
          />
          <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileOpen" class="md:hidden bg-primary">
      <router-link
          v-for="(path,label) in mobileRoutes"
          :key="label"
          :to="path"
          class="block px-4 py-2 hover:bg-secondary"
          @click="mobileOpen=false"
      >{{ label }}</router-link>

      <template v-if="isAuthenticated">
        <router-link
            :to="dashboardRoute"
            class="block px-4 py-2 hover:bg-secondary"
            @click="mobileOpen=false"
        >{{ dashboardLabel }}</router-link>
        <button
            @click="handleLogout"
            class="w-full text-left px-4 py-2 hover:bg-secondary"
        >Logout</button>
      </template>

      <template v-else>
        <router-link to="/login" class="block px-4 py-2 hover:bg-secondary">Login</router-link>
        <router-link to="/register" class="block px-4 py-2 hover:bg-secondary">Register</router-link>
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
      mobileOpen: false,
      mobileRoutes: {
        Home: '/',
        Memberships: '/memberships',
        Products: '/products',
        Classes: '/classes',
        Workouts: '/workouts'
      }
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated','userRole']),
    dashboardRoute() {
      switch (this.userRole) {
        case 'ADMIN': return { name: 'AdminUsers' };
        case 'COACH': return { name: 'CoachDashboard' };
        default:      return { name: 'UserDashboard' };
      }
    },
    dashboardLabel() {
      switch (this.userRole) {
        case 'ADMIN': return 'Admin Dashboard';
        case 'COACH': return 'Coach Dashboard';
        default:      return 'Dashboard';
      }
    }
  },
  methods: {
    async handleLogout() {
      try {
        await AuthService.logout();
        this.$store.dispatch('logout');
        // redirect to login after logout
        this.$router.push({ name: 'Login' });
        this.$toast.success('Logged out');
      } catch {
        this.$toast.error('Logout failed');
      }
    }
  }
};
</script>
