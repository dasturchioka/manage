<script lang="ts" setup>
import { useSlicedLetter } from "@/composables/useSlicedLetter";

import Logo from "@/assets/icons/logo.svg";

import AppLink from "./UI/AppLink.vue";
import AppButton from "./UI/AppButton.vue";

import HomeIcon from "@/components/icons/Home.vue";
import TrashIcon from "./icons/Trash.vue";
import BellIcon from "@/components/icons/Bell.vue";
import SettingsIcon from "@/components/icons/Settings.vue";
import DashboardLightIcon from "@/components/icons/DashboardLight.vue";
import UserIcon from "@/components/icons/User.vue";
import LogoutIcon from "@/components/icons/Logout.vue";

import { useDashboard } from "@/stores/dashboard";

import { defineAsyncComponent, ref } from "vue";

const TheCreateDashboard = defineAsyncComponent(() => {
  return import("./TheCreateDashboard.vue");
});

const { sliceLetter } = useSlicedLetter();

const dashboardStore = useDashboard();

const showCreateComponent = ref(false);

const handleShow = () => {
  showCreateComponent.value = !showCreateComponent.value;
};
</script>

<template>
  <aside class="sidebar-navigation bg-dark-secondary w-[250px]">
    <div class="side-top w-[70px] my-8 ml-5">
      <img :src="Logo" class="w-full h-full object-cover" alt="logo" />
    </div>
    <div class="side-links my-5">
      <AppLink path="/">
        <HomeIcon class="mr-2" />
        Overview
      </AppLink>
      <AppLink path="/notification">
        <BellIcon class="mr-2" />
        Notification
      </AppLink>
      <AppLink path="/settings">
        <SettingsIcon class="mr-2" />
        Settings
      </AppLink>
      <div class="side-dashboards mt-6">
        <h3 class="title mx-4 text-xl font-bold">Dashboards</h3>
        <div
          v-if="!dashboardStore.dashboards.list.length"
          class="not-found mx-4 mt-6 space-y-2"
        >
          <p class="text-sm opacity-60">You don't have dashboards yet</p>
          <AppButton class="mb-4" @click="handleShow" :purpleBg="false">
            CREATE!
          </AppButton>
          <TheCreateDashboard v-if="showCreateComponent" />
        </div>
        <ul v-else class="dashboards mt-4 max-h-[570px] overflow-y-scroll">
          <AppLink
            class="hover-show-child relative"
            v-for="(dashboard, index) in dashboardStore.dashboards.list"
            :key="index"
            :path="`/dashboard/${dashboard.id}`"
          >
            <DashboardLightIcon class="mr-2" />
            {{ sliceLetter(17, String(dashboard.name)) }}
            <button
              type="button"
              class="absolute right-2 hover:bg-dark-secondary p-2 rounded"
            >
              <TrashIcon class="link-icon" />
            </button>
          </AppLink>
        </ul>
      </div>
      <div
        class="side-user fixed flex items-center justify-between bottom-0 bg-dark-lighter w-[250px] p-4"
      >
        <div class="profile flex items-center">
          <UserIcon class="mr-2" />
          dasturchioka
        </div>
        <button type="button">
          <LogoutIcon />
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.hover-show-child button {
  opacity: 0;
  transition: all 0.5s ease;
}

.hover-show-child:hover button {
  opacity: 1;
}

.dashboards {
  scrollbar-width: auto;
  scrollbar-color: #fff;
}

/* Chrome, Edge, and Safari */
.dashboards::-webkit-scrollbar {
  width: 4px;
}

.dashboards::-webkit-scrollbar-thumb {
  background-color: #fff;
  border-radius: 10px;
}
</style>
