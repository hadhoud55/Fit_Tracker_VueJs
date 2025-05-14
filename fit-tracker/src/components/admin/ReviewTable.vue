<template>
  <div class="overflow-x-auto">
    <table class="w-full bg-white shadow-md rounded">
      <thead class="bg-gray-200">
      <tr>
        <th class="py-2 px-4 text-left">ID</th>
        <th class="py-2 px-4 text-left">User</th>
        <th class="py-2 px-4 text-left">Class</th>
        <th class="py-2 px-4 text-left">Rating</th>
        <th class="py-2 px-4 text-left">Comment</th>
        <th class="py-2 px-4 text-left">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="review in reviews" :key="review.id" class="border-b">
        <td class="py-2 px-4">{{ review.id }}</td>
        <td class="py-2 px-4">{{ review.user.username }}</td>
        <td class="py-2 px-4">{{ review.className }}</td>
        <td class="py-2 px-4">{{ review.rating }}</td>
        <td class="py-2 px-4">{{ review.comment }}</td>
        <td class="py-2 px-4">
          <button @click="$emit('delete', review.id)" class="text-red-600 hover:text-red-800">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
};
</script>