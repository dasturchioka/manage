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

const prioritiesList: PRIORITIES[] = Object.values(PRIORITIES);

console.log(prioritiesList);

onClickOutside(outsideClickTarget, () => handlePriority());

defineProps<{ priorityName: string; variant: "full" | "short" }>();
</script>

<template>
  <div class="priority-component flex items-center relative text-sm">
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
      :class="`priority-${priorityName} priority-${priorityName}-text`"
    >
      <Flag :color="`priority-${priorityName}`" />
      <p class="text-[12px] font-bold ml-2">{{ priorityName }}</p>
    </button>
    <div
      ref="outsideClickTarget"
      v-if="showPriority"
      class="priority-list flex text-[12px] items-center z-[99999999999] flex-col bg-dark min-w-[120px] rounded absolute top-0 left-8 border border-gray-700"
    >
      <button
        v-for="(priority, index) in prioritiesList"
        :key="index"
        :disabled="priorityName === priority"
        :class="`priority-${priority}-text`"
        class="list-btn transition hover:bg-dark-lighter disabled:hover:bg-none uppercase flex items-center px-3 py-1 w-full disabled:opacity-20"
      >
        <Flag :color="`priority-${priority}`" />
        <p class="text-[12px] ml-2">{{ priority }}</p>
        <p class="ml-3" v-if="priorityName === priority">&check;</p>
      </button>
    </div>
  </div>
</template>

<style scoped>
.priority-low-text {
  @apply text-gray;
}

.priority-normal-text {
  @apply text-blue;
}

.priority-high-text {
  @apply text-yellow;
}

.priority-urgent-text {
  @apply text-red;
}
</style>
