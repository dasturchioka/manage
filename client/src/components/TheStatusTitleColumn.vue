<script setup lang="ts">
import TheTableSort from "./TheTableSort.vue";

defineProps<{ status: string }>();
</script>

<template>
  <div
    :class="status"
    class="status-title bg-dark-secondary transition py-2 px-4 rounded border-t-2 flex items-center justify-between"
  >
    <div class="titles">
      <h3 class="title uppercase">
        {{ status }}
      </h3>
    </div>
    <div class="functions">
      <TheTableSort :status="false" />
    </div>
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
