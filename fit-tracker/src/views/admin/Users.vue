<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-primary mb-6">Manage Users</h1>
    <UserTable :users="users" @delete="deleteUser" />
    <Pagination :total-pages="totalPages" :current-page="currentPage" @page-changed="fetchUsers" />
  </div>
</template>

<script>
import UserTable from '@/components/admin/UserTable.vue';
import Pagination from '@/components/shared/Pagination.vue';
import UserService from '@/services/users.js';

export default {
  components: { UserTable, Pagination },
  data() {
    return {
      users: [],
      currentPage: 0,
      totalPages: 0,
    };
  },
  async created() {
    await this.fetchUsers(0);
  },
  methods: {
    async fetchUsers(page) {
      try {
        const response = await UserService.getAll(page, 10);
        this.users = response.data.content;
        this.totalPages = response.data.totalPages;
        this.currentPage = page;
      } catch (error) {
        this.$toast.error('Failed to load users');
      }
    },
    async deleteUser(id) {
      try {
        await UserService.delete(id);
        this.$toast.success('User deleted successfully');
        await this.fetchUsers(this.currentPage);
      } catch (error) {
        this.$toast.error('Failed to delete user');
      }
    },
  },
};
</script>