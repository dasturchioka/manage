<script lang="ts" setup>
import { useSlicedLetter } from "@/composables/useSlicedLetter";
import { onClickOutside } from "@vueuse/core";

import Logo from "@/assets/icons/logo.svg";

import AppLink from "./UI/AppLink.vue";
import AppButton from "./UI/AppButton.vue";

import HomeIcon from "@/components/icons/Home.vue";
import TrashIcon from "./icons/Trash.vue";
import BellIcon from "@/components/icons/Bell.vue";
import SettingsIcon from "@/components/icons/Settings.vue";
import DashboardLightIcon from "@/components/icons/DashboardLight.vue";

import { useDashboard } from "@/stores/dashboard";
import { useModal } from "@/stores/modal";

import { defineAsyncComponent, ref } from "vue";

const TheCreateDashboard = defineAsyncComponent(() => {
  return import("./TheCreateDashboard.vue");
});

const dashboardStore = useDashboard();
const modal = useModal();

defineProps({
  show: {
    type: Boolean,
  },
});

const emits = defineEmits(["outsideClick"]);

const { sliceLetter } = useSlicedLetter();

const showCreateComponent = ref(false);

const handleShow = () => {
  showCreateComponent.value = !showCreateComponent.value;
};

const outsideClickTarget = ref(null);

onClickOutside(outsideClickTarget, () => emits("outsideClick"));
</script>

<template>
  <aside
    ref="outsideClickTarget"
    :class="{ 'show shadow-2xl': show }"
    class="sidebar-navigation flex flex-col bg-dark-secondary w-[370px] z-[99999999999]"
  >
    <div class="side-top w-[70px] my-8 ml-5">
      <img :src="Logo" class="w-full h-full object-cover" alt="logo" />
    </div>
    <div class="side-links mb-5">
      <AppLink @click="emits('outsideClick')" path="/">
        <HomeIcon class="mr-2" />
        Overview
      </AppLink>
      <AppLink @click="emits('outsideClick')" path="/notifications">
        <BellIcon class="mr-2" />
        Notification
      </AppLink>
      <AppLink @click="emits('outsideClick')" path="/settings">
        <SettingsIcon class="mr-2" />
        Settings
      </AppLink>
      <div class="side-dashboards mt-6">
        <h3 class="title mx-4 text-xl font-bold">
          Dashboards ({{ dashboardStore.dashboards.list.length }})
        </h3>
        <div
          v-if="!dashboardStore.dashboards.list.length"
          class="not-found mx-4 mt-6 space-y-2"
        >
          <p class="text-sm opacity-60">You don't have dashboards yet</p>
          <AppButton class="mb-4" @click="handleShow" :purpleBg="false">
            CREATE!
          </AppButton>
          <transition name="fade" mode="out-in">
            <TheCreateDashboard v-if="showCreateComponent" />
          </transition>
        </div>
        <ul v-else class="custom-scroll mt-4 max-h-[270px] overflow-y-scroll">
          <AppLink
            @click="emits('outsideClick')"
            class="hover-show-child relative"
            v-for="(dashboard, index) in dashboardStore.dashboards.list"
            :key="index"
            :path="`/dashboard/${dashboard.id}/${dashboard.name}`"
          >
            <DashboardLightIcon class="mr-2" />
            {{ sliceLetter(17, String(dashboard.name)) }}
            <button
              @click.prevent="
                modal.askTwice({
                  actionType: `deletingDashboard`,
                  fn: dashboardStore.deleteDashboard,
                  show: true,
                  args: dashboard.id,
                })
              "
              type="button"
              class="absolute right-2 hover:bg-dark-secondary p-2 rounded"
            >
              <TrashIcon class="link-icon" />
            </button>
          </AppLink>
        </ul>
        <hr class="opacity-10 mt-4" />
        <div
          v-if="dashboardStore.dashboards.list.length"
          class="show-create-component-alternative"
        >
          <AppButton
            @click="handleShow"
            class="text-sm opacity-50 mt-4"
            :linkAlike="true"
          >
            <span class="text-2xl mr-2">{{
              !showCreateComponent ? `&plus;` : `&minus;`
            }}</span>
            Create more
          </AppButton>
          <transition name="fade" mode="out-in">
            <TheCreateDashboard
              @dashboardCreated="handleShow"
              class="mt-4"
              v-if="showCreateComponent"
            />
          </transition>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
@media (max-width: 654px) {
  .sidebar-navigation {
    position: fixed;
    height: 100vh;
    width: 280px;
    transition: all 0.4s ease;
    transform: translateX(-100%);
  }

  .sidebar-navigation.show {
    transform: translate(0);
  }
}

.hover-show-child button {
  opacity: 0;
  transition: all 0.5s ease;
}

.hover-show-child:hover button {
  opacity: 1;
}
</style>
