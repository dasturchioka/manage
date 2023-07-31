<script setup lang="ts">
import { PRIORITIES, TASK_STATUS } from "@/constants";
import { useRoute } from "vue-router";
import { useTasks } from "@/stores/tasks";
import { useComponentImport } from "@/composables/useComponentImport";
import { useStatus } from "@/composables/useStatus";
import { ref, watch } from "vue";
import { type Tasks } from "@/interfaces/Tasks";
import { tasksInstance } from "@/http";
import { useToast } from "vue-toastification";

const { recoverStatus } = useStatus();
const { getComponent } = useComponentImport();

const TheHorizontalScroll = getComponent("TheHorizontalScroll");
const TheStatusTitleColumn = getComponent("TheStatusTitleColumn");
const TheCreateTask = getComponent("TheCreateTask");
const TheTaskBoardElementsHome = getComponent("TheTaskBoardElementsHome");

const route = useRoute();
const tasksStore = useTasks();
const toast = useToast();

const tasks = ref<Tasks[]>();

async function getDashboardTasks(dashboardId: string): Promise<void> {
  try {
    const res = await tasksInstance.get(`/dashboard-tasks/${dashboardId}`);

    if (res.data.tasks) {
      tasks.value = res.data.tasks;
    } else {
      toast(`Can't load dashboard tasks`);
      return;
    }
  } catch (error: any) {
    console.log(error);
    if (error?.response) {
      toast(error.response.data.msg);
    } else {
      toast(error.message);
    }
  }
}

watch(
  () => route.params.id,
  async (newVal, oldVal) => {
    if (newVal) {
      await getDashboardTasks(newVal as string);
      return;
    }
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
          class="card h-[90vh] flex-shrink-0 w-72 overflow-y-scroll custom-scroll space-y-3 pb-5"
        >
          <TheStatusTitleColumn :status="`todo`" />
          <div v-if="tasks" class="elements space-y-4">
            <TheTaskBoardElementsHome
              v-for="(task, index) in tasks"
              :key="index"
              :index="index"
              :dashboard-id="(task.dashboardId as string)"
              :dashboard-name="(route.params.name as string)"
              :dashboard-task="task"
              :status="recoverStatus(`todo`)"
              page="dashboard"
            />
          </div>
          <TheCreateTask
            :dashboard-id="(route.params.id as string)"
            :priority="PRIORITIES.NORMAL"
            :show-status="false"
            :status="`todo`"
          />
        </div>
      </template>
    </TheHorizontalScroll>
  </main>
</template>
