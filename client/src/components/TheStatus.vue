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
        :disabled="statusName === TASK_STATUS.TODO"
        class="list-btn transition hover:bg-dark-lighter disabled:hover:bg-none uppercase flex items-center font-semibold px-3 py-1 w-full disabled:opacity-20"
      >
        <span class="w-3 h-3 rounded mr-2 bg-gray"></span>
        {{ TASK_STATUS.TODO }}
        <p v-if="statusName === TASK_STATUS.TODO">&check;</p>
      </button>
      <button
        :disabled="statusName === TASK_STATUS.INPROGRESS"
        class="list-btn uppercase hover:bg-dark-lighter disabled:hover:bg-none flex items-center font-semibold px-3 py-1 w-full disabled:opacity-20"
      >
        <span class="w-3 h-3 rounded mr-2 bg-blue"></span>
        {{ TASK_STATUS.INPROGRESS }}
        <p v-if="statusName === TASK_STATUS.INPROGRESS">&check;</p>
      </button>
      <button
        :disabled="statusName === TASK_STATUS.COMPLETED"
        class="list-btn uppercase hover:bg-dark-lighter disabled:hover:bg-none flex items-center font-semibold px-3 py-1 w-full disabled:opacity-20"
      >
        <span class="w-3 h-3 rounded mr-2 bg-green"></span>
        {{ TASK_STATUS.COMPLETED }}
        <p class="ml-4" v-if="statusName === TASK_STATUS.COMPLETED">&check;</p>
      </button>
      <button
        :disabled="statusName === TASK_STATUS.FAILED"
        class="list-btn uppercase hover:bg-dark-lighter disabled:hover:bg-none flex items-center font-semibold px-3 py-1 w-full disabled:opacity-20"
      >
        <span class="w-3 h-3 rounded mr-2 bg-red"></span>
        {{ TASK_STATUS.FAILED }}
        <p v-if="statusName === TASK_STATUS.FAILED">&check;</p>
      </button>
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
