<script setup lang="ts">
import { ref } from "vue";
import AppIconButton from "./UI/AppIconButton.vue";
import ThePriority from "./ThePriority.vue";
import TheStatus from "./TheStatus.vue";

defineProps<{ page: "overview" | "dashboard"; dashboard: string }>();

const showForm = ref(false);

const handleForm = () => (showForm.value = !showForm.value);
</script>

<template>
  <div class="board-element bg-dark-secondary transition py-2 px-4 rounded">
    <p
      class="dashboard-name mt-2 first-letter:uppercase opacity-30 text-[12px]"
    >
      {{ dashboard }}
    </p>
    <h2 class="title mt-2 text-lg">Make something better</h2>
    <div class="bottom flex items-center space-x-4">
      <TheStatus status-name="failed" variant="full" />
      <ThePriority priority-name="high" variant="full" />
    </div>
  </div>
</template>
