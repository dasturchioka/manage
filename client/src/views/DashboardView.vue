<script setup lang="ts">
import { PRIORITIES, TASK_STATUS } from "@/constants";
import { useRoute } from "vue-router";
import { useTasks } from "@/stores/tasks";
import { useComponentImport } from "@/composables/useComponentImport";
import { useStatus } from "@/composables/useStatus";
import { computed, onMounted, watch } from "vue";

const { recoverStatus } = useStatus();
const { getComponent } = useComponentImport();

const TheHorizontalScroll = getComponent("TheHorizontalScroll");
const TheStatusTitleColumn = getComponent("TheStatusTitleColumn");
const TheCreateTask = getComponent("TheCreateTask");
const TheTaskBoardElementsHome = getComponent("TheTaskBoardElementsHome");

const route = useRoute();
const tasksStore = useTasks();

watch(
  () => route.params.id,
  () => {
    tasksStore.dashboardId = route.params.id as string;
  },
  { deep: true, immediate: true }
);

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

          <div
            v-if="tasksStore.currentDashboardTasks"
            class="elements space-y-4"
          >
            <TheTaskBoardElementsHome
              v-for="(task, index) in tasksStore.currentDashboardTasks"
              :key="index"
              :index="index"
              :dashboard-id="(task.dashboardId as string)"
              :dashboard-name="(route.params.name as string)"
              :dashboard-task="task"
              :status="recoverStatus(status)"
              page="overview"
            />
          </div>
          <TheCreateTask
            :dashboard-id="(route.params.id as string)"
            :priority="PRIORITIES.NORMAL"
            :show-status="false"
            :status="status"
          />
        </div>
      </template>
    </TheHorizontalScroll>
  </main>
</template>
