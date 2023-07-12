<script lang="ts" setup>
import TheStatus from "./TheStatus.vue";
import { ref } from "vue";

const activeList = ref(false);

const toggleActiveList = (payload: boolean) => {
  activeList.value = payload;
};
</script>

<template>
  <div
    :class="{ 'bg-dark-lighter': activeList }"
    class="list transition flex items-center justify-between bg-dark rounded px-4 py-2"
  >
    <div class="title">Make something different</div>
    <div class="status">
      <TheStatus
        @active-list-item="toggleActiveList"
        variant="full"
        status-name="todo"
      />
    </div>
    <div class="priority">URGENT</div>
    <div class="buttons"></div>
  </div>
</template>
