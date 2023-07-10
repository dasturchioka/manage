<script setup lang="ts">
import { TASK_STATUS } from "@/constants";

defineProps({
  statusName: {
    type: String,
    required: true,
  },
  hasSelection: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="status-component">
    <span
      :class="{
        'bg-green': statusName === TASK_STATUS.COMPLETED,
        'bg-red': statusName === TASK_STATUS.FAILED,
        'bg-gray': statusName === TASK_STATUS.TODO,
        'bg-blue': statusName === TASK_STATUS.INPROGRESS,
      }"
      class="w-5 h-5 rounded"
    ></span>
    <div class="selection-part" v-if="hasSelection">
      <p class="status-name uppercase">{{ statusName }}</p>
      
    </div>
  </div>
</template>
