<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import TheTableSort from "./TheTableSort.vue";
import EditIcon from "./icons/Edit.vue";
import TickIcon from "./icons/Tick.vue";
import TimesIcon from "./icons/Times.vue";
import AppIconButton from "./UI/AppIconButton.vue";
import { useDashboard } from "@/stores/dashboard";
const props = defineProps<{
  title: string;
  id: string;
}>();

const dashboardStore = useDashboard();

const currentDashboard = dashboardStore.getOneDashboard(props.id);

const newName = ref<string>(props.title ? props.title : "");

const showForm = ref(false);

const closeForm = () => {
  showForm.value = false;
  newName.value = props.title;
};

const openForm = () => {
  showForm.value = true
}

const editDashboard = async (name: string, id: string) => {
  await dashboardStore.editDashboard(name, id);
  showForm.value = false;
};

onUnmounted(() => {
  newName.value = props.title;
});
</script>

<template>
  <div
    class="dashboard-title bg-dark-secondary transition py-2 px-4 rounded border-t-2 border-t-purple"
  >
    <div class="titles flex items-center justify-between">
      <h3 v-show="!showForm" class="title first-letter:uppercase">
        {{ newName }}
      </h3>
      <form
        @submit.prevent="editDashboard(newName, props.id)"
        v-show="showForm"
        class="edit-title-form first-letter:uppercase flex items-center justify-between w-full"
      >
        <input
          type="text"
          class="bg-transparent outline-none border rounded pl-2 w-[170px]"
          v-model="newName"
        />
        <div class="options flex items-center justify-between">
          <AppIconButton v-show="showForm">
            <TickIcon class="w-[19px] h-[19px]" />
          </AppIconButton>
          <AppIconButton type="button" v-show="showForm" @click="closeForm">
            <TimesIcon class="w-[19px] h-[19px]" />
          </AppIconButton>
        </div>
      </form>
      <div class="functions flex items-center">
        <AppIconButton v-show="!showForm" @click="openForm">
          <EditIcon />
        </AppIconButton>
        <TheTableSort :status="true" v-show="!showForm" />
      </div>
    </div>
  </div>
</template>
