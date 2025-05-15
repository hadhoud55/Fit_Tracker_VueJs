<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-primary mb-6">My Classes</h1>
    <!-- Create Form -->
    <div class="bg-white p-6 rounded shadow-md mb-8">
      <h2 class="text-xl font-semibold mb-4">Add New Class</h2>
      <ClassForm @class-created="fetchClasses" />
    </div>
    <!-- Classes List -->
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
    <div v-else>
      <MyClassesList :classes="classes.content" @edit-class="editClass" @delete-class="deleteClass" />
      <Pagination
          v-if="classes.totalPages > 1"
          :total-pages="classes.totalPages"
          :current-page="currentPage"
          @page-change="changePage"
      />
    </div>
    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 class="text-xl font-semibold mb-4">Edit Class</h2>
        <ClassForm :classData="editForm" @class-updated="handleClassUpdated" @cancel="showEditModal = false" />
      </div>
    </div>
  </div>
</template>

<script>
import ClassService from '@/services/classes.js';
import MyClassesList from '@/components/coach/MyClassesList.vue';
import ClassForm from '@/components/admin/ClassForm.vue';
import Pagination from '@/components/shared/Pagination.vue';
import { mapGetters } from 'vuex';

export default {
  components: { MyClassesList, ClassForm, Pagination },
  data() {
    return {
      classes: { content: [], totalPages: 0 },
      currentPage: 0,
      pageSize: 10,
      loading: false,
      error: null,
      showEditModal: false,
      editForm: null,
    };
  },
  computed: {
    ...mapGetters(['userId', 'userRole']),
    isCoachOrAdmin() {
      return ['COACH', 'ADMIN'].includes(this.userRole);
    },
  },
  methods: {
    async fetchClasses() {
      if (!this.isCoachOrAdmin) {
        this.$toast.error('Unauthorized: Coach or Admin access required');
        this.$router.push('/');
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        this.classes = await ClassService.getByCoach(this.userId, this.currentPage, this.pageSize);
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to load classes';
        this.$toast.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    async changePage(page) {
      this.currentPage = page;
      await this.fetchClasses();
    },
    editClass(gymClass) {
      this.editForm = { ...gymClass, workoutIds: gymClass.workoutIds || [] };
      this.showEditModal = true;
    },
    async deleteClass(id) {
      if (!confirm('Are you sure you want to delete this class?')) return;
      try {
        await ClassService.delete(id);
        this.$toast.success('Class deleted successfully');
        await this.fetchClasses();
      } catch (error) {
        this.$toast.error(error.response?.data?.message || 'Failed to delete class');
      }
    },
    async handleClassUpdated() {
      this.showEditModal = false;
      this.$toast.success('Class updated successfully');
      await this.fetchClasses();
    },
  },
  created() {
    this.fetchClasses();
  },
};
</script>