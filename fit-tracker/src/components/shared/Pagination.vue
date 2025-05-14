<template>
  <div class="flex justify-center mt-4">
    <button
        v-for="page in pages"
        :key="page"
        @click="$emit('page-changed', page - 1)"
        :class="{
        'px-4 py-2 mx-1 rounded': true,
        'bg-accent text-white': page - 1 === currentPage,
        'bg-gray-200 hover:bg-gray-300': page - 1 !== currentPage,
      }"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pages() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    },
  },
};
</script>