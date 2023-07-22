<script lang="ts" setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import AppButton from "./UI/AppButton.vue";
defineProps<{ status: boolean }>();

const showOptions = ref(false);

const handleOptions = () => {
  showOptions.value = !showOptions.value;
};

const outsideClickTarget = ref(null);

onClickOutside(outsideClickTarget, () => {
  showOptions.value = false;
});
</script>

<template>
  <div ref="outsideClickTarget" class="sort-component relative">
    <button
      @click="handleOptions"
      class="component-sort rounded p-3 transition hover:bg-dark-lighter"
    >
      <img src="../assets/icons/sort.svg" alt="manage" />
    </button>
    <div
      v-show="showOptions"
      class="status-list flex max-h-[120px] overflow-y-scroll custom-scroll absolute right-0 items-center z-[99999999999] flex-col min-w-[200px] bg-dark break-words rounded border border-gray-700"
    >
      <AppButton :small-btn="true"> High priorities up </AppButton>
      <AppButton :small-btn="true"> Low priorities up </AppButton>
      <div v-if="status" class="statuses flex flex-col items-center w-full">
        <AppButton :small-btn="true"> Todo up </AppButton>
        <AppButton :small-btn="true"> In progress up </AppButton>
        <AppButton :small-btn="true"> Completed up </AppButton>
        <AppButton :small-btn="true"> Failed up </AppButton>
      </div>
    </div>
  </div>
</template>
