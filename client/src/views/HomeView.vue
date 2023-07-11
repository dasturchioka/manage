<script setup lang="ts">
import { useDashboard } from "@/stores/dashboard";
import TheListOfTasks from "@/components/TheListOfTasks.vue";

const dashboardStore = useDashboard();
</script>

<template>
  <main class="overview-page sm:px-4 px-2 space-y-6 w-full pb-12">
    <div class="titles sm:my-8 mb-5 mt-3">
      <h1 class="title text-3xl font-bold">Overview</h1>
      <p class="text-lg opacity-60 mt-2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ex
        distinctio quaerat
      </p>
    </div>
    <TheListOfTasks
      v-for="(dashboard, index) in dashboardStore.dashboards.list"
      :key="index"
      :dashboard="(dashboard.name as string)"
      :tasks="dashboard.tasks"
    />
  </main>
</template>

<style scoped>
.overview-page {
  justify-self: start;
}
</style>
