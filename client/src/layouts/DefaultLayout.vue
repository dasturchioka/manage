<script lang="ts" setup>
import TheModal from "@/components/TheModal.vue";
import TheSidebar from "@/components/TheSidebar.vue";

import { RouterView } from "vue-router";
import { useUser } from "@/stores/user";
import { useDashboard } from "@/stores/dashboard";
import { onMounted } from "vue";
import { useModal } from "@/stores/modal";

const modalStore = useModal()
const userStore = useUser();
const dashboardStore = useDashboard();

onMounted(async () => {
  await userStore.getUser();
  await dashboardStore.getAllDashboards();
});
</script>

<template>
  <div
    class="default-layout text-white relative font-main h-screen max-h-screen custom-scroll"
  >
    <TheModal v-if="modalStore.info.show" />
    <div class="flex h-screen gap-10 mx-auto no-scroll custom-scroll">
      <TheSidebar />
      <div
        class="scrollable-content max-h-screen overflow-y-scroll no-scroll w-full custom-scroll"
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
