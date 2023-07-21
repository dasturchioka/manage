<script setup lang="ts">
import { TASK_STATUS } from "@/constants";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

const emit = defineEmits(["activeListItem", "statusSelected"]);

const showStatus = ref(false);
const outsideClickTarget = ref(null);

const handleStatus = () => {
  showStatus.value = !showStatus.value;
  emit("activeListItem", showStatus.value);
};

const selectStatus = (status: string) => {
  emit("statusSelected", status);
  handleStatus();
};

const statusList: TASK_STATUS[] = Object.values(TASK_STATUS);

onClickOutside(outsideClickTarget, () => handleStatus());

defineProps<{
  statusName: string;
  variant: "full" | "short";
  listPosition?: string;
}>();
</script>

<template>
  <div class="status-component flex items-center relative text-sm">
    <button
      type="button"
      @click="handleStatus"
      v-if="variant === 'short'"
      :class="`status-${statusName}`"
      class="short-variant w-3 h-3 rounded-full"
    ></button>
    <button
      type="button"
      @click="handleStatus"
      v-if="variant === 'full'"
      :class="`status-${statusName}-text ${
        showStatus ? 'bg-gray bg-opacity-10' : ''
      }`"
      class="full-variant flex items-center uppercase font-bold transition rounded px-2 py-1"
    >
      <span
        :class="`status-${statusName}`"
        class="short-variant w-2 h-2 rounded mr-2"
      ></span>
      <p class="text-[12px]">{{ statusName }}</p>
    </button>
    <transition name="fade" mode="out-in">
      <div
        ref="outsideClickTarget"
        v-if="showStatus"
        class="status-list flex text-[12px] items-center z-[99999999999] flex-col bg-dark min-w-[160px] rounded absolute border border-gray-700"
        :class="listPosition ? listPosition : 'top-7 left-[30px]'"
      >
        <button
          type="button"
          v-for="(status, index) in statusList"
          @click="selectStatus(status)"
          :key="index"
          :disabled="statusName === status"
          class="list-btn transition hover:bg-dark-lighter disabled:hover:bg-none uppercase flex items-center font-semibold px-3 py-1 w-full disabled:opacity-20"
        >
          <span class="w-2 h-2 rounded mr-2" :class="`status-${status}`"></span>
          <p :class="`status-${status}-text`" class="text-[12px]">
            {{ status }}
          </p>
          <p class="ml-3" v-if="statusName === status">&check;</p>
        </button>
      </div>
    </transition>
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
