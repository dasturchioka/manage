<script setup lang="ts">
import { useDashboard } from "@/stores/dashboard";
import TheHorizontalScroll from "@/components/TheHorizontalScroll.vue";
import TheDashboardTitleColumn from "@/components/TheDashboardTitleColumn.vue";
import AppIconButton from "@/components/UI/AppIconButton.vue";
import TheCreateDashboard from "@/components/TheCreateDashboard.vue";
import TheTaskBoardElementsHome from "@/components/TheTaskBoardElementsHome.vue";
import TheCreateTask from "@/components/TheCreateTask.vue";
import { onMounted, ref } from "vue";
import type { Tasks } from "@/interfaces/Tasks";
import { useTasks } from "@/stores/tasks";

const dashboardStore = useDashboard();
const tasksStore = useTasks();

const showForm = ref(false);

const handleForm = () => {
  showForm.value = !showForm.value;
};

onMounted(async () => {
  await dashboardStore.getAllDashboards();
  await tasksStore.getAllTasks()
});
</script>

<template>
  <main
    class="overview-page flex-shrink-0 sm:px-4 px-2 h-screen w-full overflow-x-scroll custom-scroll overflow-y-hidden custom-scroll-h sm:pt-6 pt-3"
  >
    <TheHorizontalScroll v-if="dashboardStore.dashboards.list.length">
      <template #titles></template>
      <template #content>
        <div
          v-for="(dashboard, index) in dashboardStore.dashboards.list"
          :key="index"
          class="card h-[90vh] flex-shrink-0 w-80 overflow-y-scroll custom-scroll space-y-3 pb-5"
        >
          <TheDashboardTitleColumn
            page="overview"
            :id="(dashboard.id as string)"
            :title="(dashboard.name as string)"
          ></TheDashboardTitleColumn>
          <TheTaskBoardElementsHome
            page="overview"
            :dashboard-name="(dashboard.name as string)"
            :dashboard-id="(dashboard.id as string)"
            :dashboard-tasks="tasksStore.dashboardTasks(dashboard.id as string)"
          />
          <TheCreateTask
            :dashboard-id="(dashboard.id as string)"
            priority="normal"
            status="todo"
            :show-status="true"
          />
        </div>
      </template>
    </TheHorizontalScroll>
    <div
      v-else
      class="not-found-component flex flex-col items-center justify-center h-screen"
    >
      <div class="img w-[200px]">
        <img
          class="w-full object-cover"
          src="../assets/icons/404-error.png"
          alt=""
        />
      </div>
      <div class="text text-center my-4">
        <h1 class="text-2xl font-bold">Ooops!</h1>
        <p class="mt-2">You don't have any dashboards yet.</p>
      </div>
      <div
        class="create-dashboard-component relative flex flex-col items-center justify-center"
      >
        <AppIconButton @click="handleForm" class="flex items-center px-4 mb-4">
          <p v-show="!showForm" class="mr-2 text-xl">&plus;</p>
          <p v-show="!showForm">Create one!</p>
          <p v-show="showForm" class="mr-2 text-xl">-</p>
          <p v-show="showForm">Discard</p>
        </AppIconButton>
        <TheCreateDashboard v-show="showForm" @dashboard-created="handleForm" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.overview-page {
  justify-self: start;
}
</style>
