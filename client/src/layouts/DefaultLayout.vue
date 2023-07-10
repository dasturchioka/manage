<script lang="ts" setup>
import TheModal from "@/components/TheModal.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import TheNavbar from "@/components/TheNavbar.vue";

import { RouterView } from "vue-router";
import { useUser } from "@/stores/user";
import { useDashboard } from "@/stores/dashboard";
import { onMounted, ref } from "vue";
import { useModal } from "@/stores/modal";

const showSideber = ref(false);

const modalStore = useModal();
const userStore = useUser();
const dashboardStore = useDashboard();

const handleSidebar = () => {
  showSideber.value = !showSideber.value;  
};

const closeSidebar = () => {
  showSideber.value = false
}

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
    <div class="flex h-screen mx-auto no-scroll custom-scroll">
      <TheNavbar @btn-clicked="handleSidebar" />
      <TheSidebar @outside-click="closeSidebar" :show="showSideber" />
      <div
        class="scrollable-content container mx-auto max-h-screen overflow-y-scroll no-scroll w-full custom-scroll"
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

<style scoped>
@media (max-width: 654px) {
  .scrollable-content {
    padding-top: 80px;
  }
}
</style>
