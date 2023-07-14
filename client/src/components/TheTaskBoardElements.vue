<script setup lang="ts">
import { ref } from "vue";
import AppIconButton from "./UI/AppIconButton.vue";
import ThePriority from "./ThePriority.vue";
import TheStatus from "./TheStatus.vue";
import Trash from "./icons/Trash.vue";
import Tick from "./icons/Tick.vue";
import Edit from "./icons/Edit.vue";

defineProps<{ page: "overview" | "dashboard"; dashboard: string }>();

const showEditInput = ref(false);

const handleEditInput = () => {
  showEditInput.value = !showEditInput.value;
};

const taskTitle = ref(" Make something better");
</script>

<template>
  <div>
    <div class="board-element bg-dark-secondary transition py-2 px-4 rounded">
      <p
        class="dashboard-name mt-2 first-letter:uppercase opacity-30 text-[12px]"
      >
        {{ dashboard }}
      </p>
      <h2 v-show="!showEditInput" class="title mt-2 text-lg flex">
        {{ taskTitle }}
        <AppIconButton
          @click="handleEditInput"
          class="transition opacity-0 flex items-center justify-center ml-2"
        >
          <Edit />
        </AppIconButton>
      </h2>
      <form
        v-show="showEditInput"
        class="inline-edit-task mt-2 flex items-center"
      >
        <input
          type="text"
          placeholder="Edit and press Enter"
          v-model="taskTitle"
          autocomplete="off"
          id="title"
          class="rounded outline-none bg-transparent border border-gray-800 transition focus:border-white pl-1"
        />
        <AppIconButton class="ml-2">
          <Tick />
        </AppIconButton>
      </form>
      <div class="bottom flex items-center justify-between mt-3 space-x-2">
        <div class="left flex items-center space-x-2">
          <TheStatus status-name="failed" variant="full" />
          <ThePriority priority-name="high" variant="full" />
        </div>
        <div class="right">
          <AppIconButton>
            <Trash />
          </AppIconButton>
          <AppIconButton>
            <Tick />
          </AppIconButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2:hover button {
  @apply opacity-100;
}
</style>
