<script setup lang="ts">
import { PRIORITIES } from "@/constants";
import { onClickOutside } from "@vueuse/core";
import Flag from "./icons/Flag.vue";
import { ref } from "vue";

const emit = defineEmits(["activeListItem"]);

const showPriority = ref(false);
const outsideClickTarget = ref(null);

const handlePriority = () => {
  showPriority.value = !showPriority.value;
  emit("activeListItem", showPriority.value);
};

onClickOutside(outsideClickTarget, () => handlePriority());

defineProps<{ priorityName: string; variant: "full" | "short" }>();
</script>

<template>
  <div class="status-component flex items-center relative text-sm">
    <button
      @click="handlePriority"
      v-if="variant === 'short'"
      class="short-variant"
    >
      <Flag :color="`priority-${priorityName}`" />
    </button>
    <button
      @click="handlePriority"
      v-if="variant === 'full'"
      class="full-variant flex items-center uppercase"
    >
      <Flag :color="`priority-${priorityName}`" />
      {{ priorityName }}
    </button>
    <div
      ref="outsideClickTarget"
      v-if="showPriority"
      class="status-list flex text-[12px] items-center z-[99999999999] flex-col bg-dark min-w-[160px] rounded absolute -top-14 left-8 border border-gray-700"
    >
      <button></button>
    </div>
  </div>
</template>

<style scoped>
.status-completed {
  @apply bg-green;
}
.status-todo {
  @apply bg-gray;
}
.status-in.progress {
  @apply bg-blue;
}
.status-failed {
  @apply bg-red;
}

.status-completed-text {
  @apply text-green;
}
.status-todo-text {
  @apply text-gray;
}
.status-in.progress-text {
  @apply text-blue;
}
.status-failed-text {
  @apply text-red;
}
</style>
