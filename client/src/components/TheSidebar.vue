<script lang="ts" setup>
import Logo from "@/assets/icons/logo.svg";

import AppLink from "./UI/AppLink.vue";
import AppButton from "./UI/AppButton.vue";

import HomeIcon from "@/components/icons/Home.vue";
import BellIcon from "@/components/icons/Bell.vue";
import SettingsIcon from "@/components/icons/Settings.vue";
import DashboardLightIcon from "@/components/icons/DashboardLight.vue";
import UserIcon from "@/components/icons/User.vue";
import LogoutIcon from "@/components/icons/Logout.vue";

import { useDashboard } from "@/stores/dashboard";

const dashboardStore = useDashboard()

</script>

<template>
  <aside
    class="sidebar-navigation bg-dark-secondary w-[250px]"
  >
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
        <div v-if="!dashboardStore.dashboards.list.length" class="not-found mx-4 mt-6 space-y-2">
          <p class="text-sm opacity-60">You don't have dashboards yet</p>
          <AppButton  :purpleBg="false"> CREATE! </AppButton>
        </div>
        <ul v-else class="dashboards mt-4 max-h-[570px] overflow-y-scroll">
          <AppLink path="/random">
            <DashboardLightIcon class="mr-2" />
            Frontend
          </AppLink>
        </ul>
      </div>
      <div class="side-user fixed flex items-center justify-between bottom-0 bg-dark-lighter w-[250px] p-4">
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
