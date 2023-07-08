<script lang="ts" setup>
import { RouterView } from "vue-router";
import TheSidebar from "@/components/TheSidebar.vue";
import { useUser } from "@/stores/user";
import { useDashboard } from "@/stores/dashboard";
import { onMounted } from "vue";

const userStore = useUser();
const dashboardStore = useDashboard()

onMounted(async () => {
  await userStore.getUser();
  await dashboardStore.getAllDashboards()
});
</script>

<template>
  <div class="default-layout flex text-white min-h-screen font-main overflow-y-hidden">
    <TheSidebar />
    <RouterView />
  </div>
</template>
