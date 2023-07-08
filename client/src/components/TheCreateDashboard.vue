<script setup lang="ts">
import { useDashboard } from "@/stores/dashboard";
import AppButton from "./UI/AppButton.vue";
import { ref } from "vue";

const dashboardStore = useDashboard();
const dashboardName = ref("");

const emit = defineEmits(["dashboardCreated"]);

const createDashboard = async () => {
  await dashboardStore.createDashboard(dashboardName.value);
  emit("dashboardCreated");
  dashboardName.value = ""
};
</script>

<template>
  <form
    @submit.prevent="createDashboard"
    class="create-dashboard bg-dark rounded p-4"
  >
    <div class="form-group mb-4 space-y-1">
      <label for="name">Dashboard's name:</label>
      <input
        v-model="dashboardName"
        autocomplete="off"
        id="name"
        class="rounded outline-none bg-transparent border border-gray-800 transition focus:border-white pl-1"
        type="text"
        placeholder="Name"
      />
    </div>
    <AppButton>CREATE!</AppButton>
  </form>
</template>
