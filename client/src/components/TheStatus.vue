<script setup lang="ts">
import { TASK_STATUS } from "@/constants";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

const showStatus = ref(false);
const outsideClickTarget = ref(null);

const handleStatus = () => {
  showStatus.value = !showStatus.value;
};

onClickOutside(outsideClickTarget, () => handleStatus());

defineProps({
  statusName: {
    type: String,
    required: true,
  },
  hasSelection: {
    type: Boolean,
    default: true,
  },
  hasText: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="status-component flex items-center">
    <span :class="`status-${statusName}`" class="w-3 h-3 rounded mr-2"></span>
    <div class="selection-part relative" v-if="hasSelection">
      <button
        @click="handleStatus()"
        :class="`status-${statusName}-text`"
        class="status-name uppercase font-extrabold text-sm"
      >
        {{ statusName }}
      </button>
      <div
        ref="outsideClickTarget"
        v-if="showStatus"
        class="status-list flex items-center z-[99999999999] flex-col bg-dark min-w-[160px] rounded absolute top-5 border border-gray-700"
      >
        <button
          :disabled="statusName === TASK_STATUS.TODO"
          class="list-btn transition hover:bg-dark-lighter disabled:hover:bg-none uppercase flex items-center font-extrabold px-3 py-2 w-full disabled:opacity-20"
        >
          <span class="w-3 h-3 rounded mr-2 bg-gray"></span>
          {{ TASK_STATUS.TODO }}
          <p v-if="statusName === TASK_STATUS.TODO">&check;</p>
        </button>
        <button
          :disabled="statusName === TASK_STATUS.INPROGRESS"
          class="list-btn uppercase hover:bg-dark-lighter disabled:hover:bg-none flex items-center font-extrabold px-3 py-2 w-full disabled:opacity-20"
        >
          <span class="w-3 h-3 rounded mr-2 bg-blue"></span>
          {{ TASK_STATUS.INPROGRESS }}
          <p v-if="statusName === TASK_STATUS.INPROGRESS">&check;</p>
        </button>
        <button
          :disabled="statusName === TASK_STATUS.COMPLETED"
          class="list-btn uppercase hover:bg-dark-lighter disabled:hover:bg-none flex items-center font-extrabold px-3 py-2 w-full disabled:opacity-20"
        >
          <span class="w-3 h-3 rounded mr-2 bg-green"></span>
          {{ TASK_STATUS.COMPLETED }}
          <p class="ml-4" v-if="statusName === TASK_STATUS.COMPLETED">
            &check;
          </p>
        </button>
        <button
          :disabled="statusName === TASK_STATUS.FAILED"
          class="list-btn uppercase hover:bg-dark-lighter disabled:hover:bg-none flex items-center font-extrabold px-3 py-2 w-full disabled:opacity-20"
        >
          <span class="w-3 h-3 rounded mr-2 bg-red"></span>
          {{ TASK_STATUS.FAILED }}
          <p v-if="statusName === TASK_STATUS.FAILED">&check;</p>
        </button>
      </div>
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
