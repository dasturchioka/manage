<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { TASK_STATUS } from "@/constants/index";
import TheTableSort from "./TheTableSort.vue";
import TheStatus from "./TheStatus.vue";
import TheCreateTask from "./TheCreateTask.vue";

defineProps({
  dashboard: {
    type: String,
    required: true,
  },
  tasks: {
    type: Array || undefined,
    required: true,
  },
});

const showForm = ref(false);
const showTable = ref(true);

const handleForm = () => {
  showForm.value = !showForm.value;
};

const handleTable = () => {
  showTable.value = !showTable.value;
};

const outsideClickTarget = ref(null);

onClickOutside(outsideClickTarget, () => {
  showForm.value = false;
});
</script>

<template>
  <div
    class="list-of-tasks bg-dark-secondary sm:p-6 p-4 rounded w-full relative overflow-x-scroll custom-scroll-h"
  >
    <div class="top flex items-center justify-between">
      <div class="top-left flex items-center">
        <button
          @click="handleTable"
          class="title flex items-center text-2xl font-bold first-letter:uppercase"
        >
          <img
            src="../assets/icons/dashboard_icon.svg"
            class="mr-2"
            alt="manage"
          />{{ dashboard }}
          <img
            v-if="!showTable"
            class="ml-3"
            src="../assets/icons/arrow-right.svg"
            alt="arrow right "
          />
          <img
            v-else
            class="ml-3"
            src="../assets/icons/arrow-bottom.svg"
            alt="arrow bottom "
          />
        </button>
        <p
          class="ml-4 bg-dark text-gray-700 rounded text-sm font-extrabold uppercase py-1 px-2"
          v-if="!showTable"
        >
          7 tasks
        </p>
      </div>
      <div class="top-right">
        <TheTableSort />
      </div>
    </div>

    <div
      v-show="showTable"
      class="relative sm:mt-6 mt-4 overflow-x-auto custom-scroll-h custom-scroll"
    >
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody class="mt-4 space-y-4">
          <tr class="bg-dark">
            <th
              scope="row"
              class="p-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td class="p-4">
              <TheStatus
                :has-selection="true"
                :status-name="TASK_STATUS.COMPLETED"
              />
            </td>
            <td class="p-4 text-right">Laptop</td>
            <td class="px-6 py-4 text-right">$2999</td>
          </tr>
          
        </tbody>
      </table>
    </div>
    <TheCreateTask />
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
