<script lang="ts" setup>
import { RouterView } from "vue-router";
import TheSidebar from "@/components/TheSidebar.vue";
import { useUser } from "@/stores/user";
import { useDashboard } from "@/stores/dashboard";
import { onMounted } from "vue";

const userStore = useUser();
const dashboardStore = useDashboard();

onMounted(async () => {
  await userStore.getUser();
  await dashboardStore.getAllDashboards();
});
</script>

<template>
  <div
    class="default-layout text-white relative font-main h-screen max-h-screen"
  >
    <div class="flex gap-10 mx-auto no-scroll">
      <TheSidebar />
      <div
        class="scrollable-content max-h-screen overflow-y-scroll no-scroll w-full"
      >
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
