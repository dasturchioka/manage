<script setup lang="ts">
import { TASK_STATUS } from "@/constants";
import { useRoute } from "vue-router";
import { useDashboard } from "@/stores/dashboard";
import TheHorizontalScroll from "@/components/TheHorizontalScroll.vue";

const route = useRoute();
const dashboardStore = useDashboard();

const tasks: TASK_STATUS[] = Object.values(TASK_STATUS);
</script>

<template>
  <main
    class="overview-page flex-shrink-0 sm:px-4 px-2 h-screen w-full overflow-x-scroll custom-scroll overflow-y-hidden custom-scroll-h sm:pt-6 pt-3"
  >
    <TheHorizontalScroll>
      <template #titles></template>
      <template #content>
        {{ route.params.name }}
        <div
          v-for="(task, index) in tasks"
          :key="index"
          class="card h-[90vh] flex-shrink-0 w-72 overflow-y-scroll custom-scroll space-y-3 pb-5"
        ></div>
      </template>
    </TheHorizontalScroll>
  </main>
</template>
