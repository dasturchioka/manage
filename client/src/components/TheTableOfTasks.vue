<script setup lang="ts">
// defineProps({
//   dashboard: {
//     type: String,
//     required: true,
//   },
//   tasks: {
//     type: Array,
//     required: true,
//   },
// });
</script>

<template>
  <div class="list-of-tasks bg-dark-secondary p-6 rounded">
    <h1 class="flex items-center text-2xl mb-6">
      <img
        src="../assets/icons/dashboard_icon.svg"
        class="mr-2"
        alt="manage"
      />Frontend
    </h1>

    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody class="mt-4 space-y-4">
          <tr class="bg-dark">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">Silver</td>
            <td class="px-6 py-4 text-right">Laptop</td>
            <td class="px-6 py-4 text-right">$2999</td>
          </tr>
          <tr class="bg-dark">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Microsoft Surface Pro
            </th>
            <td class="px-6 py-4">White</td>
            <td class="px-6 py-4 text-right">Laptop PC</td>
            <td class="px-6 py-4 text-right">$1999</td>
          </tr>
          <tr class="bg-dark">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Magic Mouse 2
            </th>
            <td class="px-6 py-4">Black</td>
            <td class="px-6 py-4 text-right">Accessories</td>
            <td class="px-6 py-4 text-right">$99</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0 10px;
}

tr {
  @apply transition hover:bg-dark-lighter;
}
</style>
