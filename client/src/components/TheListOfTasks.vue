<script setup lang="ts">
import { ref } from "vue";
import TheTableSort from "./TheTableSort.vue";
import TheCreateTask from "./TheCreateTask.vue";
import TheList from "./TheList.vue";

defineProps<{ dashboard: String; tasks: Object[] }>();

const showTable = ref(true);

const handleTable = () => {
  showTable.value = !showTable.value;
};
</script>

<template>
  <div
    class="list-of-tasks-component bg-dark-secondary sm:p-6 p-4 rounded w-full overflow-x-scroll overflow-y-auto custom-scroll-h"
  >
    <div
      :class="{ 'mb-4': showTable }"
      class="top flex items-center justify-between"
    >
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
            alt="arrow right"
          />
          <img
            v-else
            class="ml-3"
            src="../assets/icons/arrow-bottom.svg"
            alt="arrow bottom"
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
    <TheList v-show="showTable" />
    <TheCreateTask v-show="showTable" />
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
