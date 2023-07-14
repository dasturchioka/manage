<script setup lang="ts">
import { TASK_STATUS } from "@/constants";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

const emit = defineEmits(["activeListItem"]);

const showStatus = ref(false);
const outsideClickTarget = ref(null);

const handleStatus = () => {
  showStatus.value = !showStatus.value;
  emit("activeListItem", showStatus.value);
};

const statusList: TASK_STATUS[] = Object.values(TASK_STATUS);

onClickOutside(outsideClickTarget, () => handleStatus());

defineProps<{ statusName: string; variant: "full" | "short" }>();
</script>

<template>
  <div class="status-component flex items-center relative text-sm">
    <button
      @click="handleStatus"
      v-if="variant === 'short'"
      :class="`status-${statusName}`"
      class="short-variant w-3 h-3 rounded"
    ></button>
    <button
      @click="handleStatus"
      v-if="variant === 'full'"
      :class="`status-${statusName}-text`"
      class="full-variant flex items-center uppercase font-bold"
    >
      <span
        :class="`status-${statusName}`"
        class="short-variant w-3 h-3 rounded mr-2"
      ></span>
      {{ statusName }}
    </button>
    <div
      ref="outsideClickTarget"
      v-if="showStatus"
      class="status-list flex text-[12px] items-center z-[99999999999] flex-col bg-dark min-w-[160px] rounded absolute -top-14 left-8 border border-gray-700"
    >
      <button
        v-for="(status, index) in statusList"
        :key="index"
        :disabled="statusName === status"
        class="list-btn transition hover:bg-dark-lighter disabled:hover:bg-none uppercase flex items-center font-semibold px-3 py-1 w-full disabled:opacity-20"
      >
        <span class="w-3 h-3 rounded mr-2" :class="`status-${status}`"></span>
        {{ status }}
        <p v-if="statusName === status">&check;</p>
      </button>
      ]
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
