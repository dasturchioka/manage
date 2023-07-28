<script setup lang="ts">
import { PRIORITIES } from "@/constants";
import { onClickOutside } from "@vueuse/core";
import Flag from "./icons/Flag.vue";
import { ref } from "vue";

const emit = defineEmits(["activeListItem", "prioritySelected"]);

const showPriority = ref(false);
const outsideClickTarget = ref(null);

const handlePriority = (): void => {
  showPriority.value = !showPriority.value;
  emit("activeListItem", showPriority.value);
};

const newPriorityName = ref("");

const selectPriority = (priority: string): void => {
  emit("prioritySelected", priority);
  newPriorityName.value = priority;
  handlePriority();
};

const prioritiesList: PRIORITIES[] = Object.values(PRIORITIES);

onClickOutside(outsideClickTarget, () => handlePriority());

defineProps<{
  priorityName: string;
  variant: "full" | "short";
  listPosition?: string;
}>();
</script>

<template>
  <div class="priority-component flex items-center relative text-sm">
    <button
      type="button"
      @click="handlePriority"
      v-if="variant === 'short'"
      class="short-variant"
    >
      <Flag :color="`priority-${newPriorityName ? newPriorityName : priorityName}`" />
    </button>
    <button
      type="button"
      @click="handlePriority"
      v-if="variant === 'full'"
      class="full-variant flex items-center uppercase transition rounded px-2 py-1"
      :class="`priority-${newPriorityName ? newPriorityName : priorityName} priority-${newPriorityName ? newPriorityName : priorityName}-text ${
        showPriority ? 'bg-gray bg-opacity-10' : ''
      }`"
    >
      <Flag :color="`priority-${newPriorityName ? newPriorityName : priorityName}`" />
      <p class="text-[12px] font-bold ml-2">{{ newPriorityName ? newPriorityName : priorityName }}</p>
    </button>
    <transition name="fade" mode="out-in">
      <div
        ref="outsideClickTarget"
        v-if="showPriority"
        class="priority-list flex text-[12px] items-center z-[99999999999] flex-col bg-dark min-w-[120px] rounded absolute border border-gray-700"
        :class="listPosition ? listPosition : `top-7 left-[20px]`"
      >
        <button
          type="button"
          v-for="(priority, index) in prioritiesList"
          @click="selectPriority(priority)"
          :key="index"
          :disabled="(newPriorityName ? newPriorityName : priorityName) === priority"
          :class="`priority-${priority}-text`"
          class="list-btn transition hover:bg-dark-lighter disabled:hover:bg-none uppercase flex items-center px-3 py-1 w-full disabled:opacity-20"
        >
          <Flag :color="`priority-${priority}`" />
          <p class="text-[12px] ml-2 font-bold">{{ priority }}</p>
          <p class="ml-3" v-show="(newPriorityName ? newPriorityName : priorityName) === priority">&check;</p>
        </button>
      </div>
    </transition>
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
