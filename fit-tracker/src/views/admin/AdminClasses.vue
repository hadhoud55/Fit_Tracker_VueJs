<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Manage Classes</h1>

    <!-- Search -->
    <div class="mb-4">
      <input
          v-model="keyword"
          type="text"
          placeholder="Search classes..."
          class="w-full p-2 border rounded"
          @input="onSearchInput"
      />
    </div>

    <!-- Toggle Form -->
    <div class="mb-4">
      <button
          v-if="!showForm"
          @click="openForm(null)"
          class="bg-accent text-white px-4 py-2 rounded"
      >
        Create Class
      </button>
      <button
          v-else
          @click="showForm = false"
          class="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </div>

    <!-- Class Form -->
    <ClassForm
        v-if="showForm"
        :classData="selected"
        @class-created="onSaved"
        @class-updated="onSaved"
        @cancel="showForm = false"
    />

    <!-- Loading -->
    <div v-if="loading" class="text-center py-8">Loading…</div>

    <!-- Empty -->
    <div v-else-if="classes.length === 0" class="text-center py-8">
      No classes found.
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <AdminClassCard
          v-for="c in classes"
          :key="c.id"
          :gym-class="c"
          @edit="openForm"
          @delete="onDelete"
          @view-details="openDetails"
      />
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex justify-center space-x-2">
      <button
          :disabled="page === 0"
          @click="changePage(page - 1)"
          class="px-3 py-1 border rounded"
      >
        Prev
      </button>
      <span>Page {{ page + 1 }} of {{ total }}</span>
      <button
          :disabled="page + 1 >= total"
          @click="changePage(page + 1)"
          class="px-3 py-1 border rounded"
      >
        Next
      </button>
    </div>

    <!-- Details Modal -->
    <Modal v-if="modalOpen" :title="detail.title" @close="modalOpen = false">
      <div class="space-y-4">
        <p><strong>Coach:</strong> {{ detail.coachName }}</p>
        <p><strong>Start:</strong> {{ formatDate(detail.startTime) }}</p>
        <p><strong>Duration:</strong> {{ detail.duration }} minutes</p>
        <div class="flex space-x-2 overflow-x-auto">
          <img
              v-for="(u, i) in detail.imageUrls"
              :key="i"
              :src="u"
              class="w-32 h-32 object-cover rounded"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import ClassForm from '@/components/admin/ClassForm.vue';
import AdminClassCard from '@/components/admin/AdminClassCard.vue';
import Modal from '@/components/shared/Modal.vue';
import ClassService from '@/services/classes.js';
import { mapGetters } from 'vuex';
import { debounce } from 'lodash';

export default {
  components: { ClassForm, AdminClassCard, Modal },
  data() {
    return {
      keyword: '',
      classes: [],
      page: 0,
      total: 1,
      loading: false,

      showForm: false,
      selected: null,

      modalOpen: false,
      detail: {}
    };
  },
  computed: {
    ...mapGetters(['userRole']),
    isAdmin() {
      return this.userRole === 'ADMIN';
    }
  },
  created() {
    if (!this.isAdmin) {
      this.$toast.error('Unauthorized');
      this.$router.push('/');
      return;
    }
    this.debouncedFetch = debounce(this.fetch, 300);
    this.fetch(0);
  },
  methods: {
    async fetch(page = 0) {
      this.loading = true;
      this.page = page;
      try {
        const r = await ClassService.search({
          keyword: this.keyword,
          page: this.page,
          size: 9
        });
        this.classes = r.content;
        this.total = r.totalPages;
      } catch (e) {
        this.$toast.error(e.message || 'Failed to fetch classes');
      } finally {
        this.loading = false;
      }
    },
    openForm(cls = null) {
      this.selected = cls ? { ...cls } : null;
      this.showForm = true;
    },
    async onSaved() {
      this.showForm = false;
      await this.fetch(this.page);
    },
    async onDelete(cls) {
      if (!confirm(`Delete ${cls.title}?`)) return;
      try {
        await ClassService.delete(cls.id);
        this.fetch(this.page);
      } catch (e) {
        this.$toast.error(e.message || 'Delete failed');
      }
    },
    openDetails(id) {
      ClassService.getById(id)
          .then((data) => {
            this.detail = data;
            this.modalOpen = true;
          })
          .catch((e) => this.$toast.error(e.message));
    },
    changePage(n) {
      if (n < 0 || n >= this.total) return;
      this.page = n;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.fetch(this.page);
    },
    onSearchInput() {
      this.page = 0;
      this.debouncedFetch(0);
    },
    formatDate(dt) {
      return dt ? new Date(dt).toLocaleString() : 'N/A';
    }
  }
};
</script>
