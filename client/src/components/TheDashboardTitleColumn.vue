<script setup lang="ts">
import { ref } from "vue";
import TheTableSort from "./TheTableSort.vue";
import EditIcon from "./icons/Edit.vue";
import TickIcon from "./icons/Tick.vue";
import TimesIcon from "./icons/Times.vue";
import AppIconButton from "./UI/AppIconButton.vue";
import { useDashboard } from "@/stores/dashboard";
const props = defineProps<{ title: string; id: string }>();

const dashboardStore = useDashboard();

const currentDashboard = dashboardStore.getOneDashboard(props.id);

const showForm = ref(false);

const handleForm = () => (showForm.value = !showForm.value);
</script>

<template>
  <div
    class="dashboard-title bg-dark-secondary transition py-2 px-4 rounded border-t border-t-purple"
  >
    <div class="titles flex items-center justify-between">
      <h3 v-show="!showForm" class="title first-letter:uppercase">
        {{ currentDashboard.name }}
      </h3>
      <form
        @submit.prevent="dashboardStore.editDashboard(props.title, props.id)"
        v-show="showForm"
        class="edit-title-form first-letter:uppercase flex items-center justify-between w-full"
      >
        <input
          type="text"
          class="bg-transparent outline-none border rounded pl-2 w-[170px]"
          v-model="(currentDashboard.name as string)"
        />
        <div class="options flex items-center justify-between">
          <AppIconButton v-show="showForm">
            <TickIcon class="w-[19px] h-[19px]" />
          </AppIconButton>
          <AppIconButton type="button" v-show="showForm" @click="handleForm">
            <TimesIcon class="w-[19px] h-[19px]" />
          </AppIconButton>
        </div>
      </form>
      <div class="functions flex items-center">
        <AppIconButton v-show="!showForm" @click="handleForm">
          <EditIcon />
        </AppIconButton>
        <TheTableSort v-show="!showForm" />
      </div>
    </div>
  </div>
</template>
