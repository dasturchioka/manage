<script setup lang="ts">
import { useStatus } from "@/composables/useStatus";

defineProps<{ status: number }>();

const { convertStatus } = useStatus();
</script>

<template>
  <div
    :class="convertStatus(status)"
    class="status-title bg-dark-secondary transition py-2 px-4 rounded border-t-2 flex items-center justify-between"
  >
    <div class="titles">
      <h3 class="title uppercase">
        {{ convertStatus(status) }}
      </h3>
    </div>
    <div class="functions"></div>
  </div>
</template>

<style scoped>
.in.progress.status-title {
  @apply border-t-blue;
}

.todo.status-title {
  @apply border-t-gray;
}

.completed.status-title {
  @apply border-t-green;
}

.failed.status-title {
  @apply border-t-red;
}
</style>
