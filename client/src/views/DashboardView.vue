<script setup lang="ts">
import { TASK_STATUS } from "@/constants";
import { useRoute } from "vue-router";
import { useDashboard } from "@/stores/dashboard";
import TheHorizontalScroll from "@/components/TheHorizontalScroll.vue";
import TheStatusTitleColumn from "@/components/TheStatusTitleColumn.vue";
import TheCreateTask from "@/components/TheCreateTask.vue";

const route = useRoute();
const dashboardStore = useDashboard();

const tasksStatus: TASK_STATUS[] = Object.values(TASK_STATUS);
</script>

<template>
  <main
    class="overview-page flex-shrink-0 sm:px-4 px-2 h-screen w-full overflow-x-scroll custom-scroll overflow-y-hidden custom-scroll-h sm:pt-6 pt-3"
  >
    <TheHorizontalScroll>
      <template #titles></template>
      <template #content>
        <div
          v-for="(status, index) in tasksStatus"
          :key="index"
          class="card h-[90vh] flex-shrink-0 w-72 overflow-y-scroll custom-scroll space-y-3 pb-5"
        >
          <TheStatusTitleColumn :status="status" />
          <TheCreateTask :show-status="true" :status="status" priority="normal" />
        </div>
      </template>
    </TheHorizontalScroll>
  </main>
</template>
