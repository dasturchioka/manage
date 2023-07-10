<script lang="ts" setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

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
  <div class="sort-component relative">
    <button
      @click="handleOptions"
      class="component-sort rounded p-3 transition hover:bg-dark-lighter"
    >
      <img src="../assets/icons/sort.svg" alt="manage" />
    </button>
    <div
      v-show="showOptions"
      ref="outsideClickTarget"
      class="status-list flex max-h-[120px] overflow-y-scroll custom-scroll absolute right-0 items-center z-[99999999999] flex-col min-w-[200px] bg-dark break-words rounded border border-gray-700"
    >
      <button
        class="list-btn transition hover:bg-dark-lighter disabled:hover:bg-none uppercase flex items-center font-extrabold px-3 py-2 w-full disabled:opacity-20 text-sm"
      >
        High priorities up
      </button>
      <button
        class="list-btn transition hover:bg-dark-lighter disabled:hover:bg-none uppercase flex items-center font-extrabold px-3 py-2 w-full disabled:opacity-20 text-sm"
      >
        Low priorities up
      </button>
      <button
        class="list-btn transition hover:bg-dark-lighter disabled:hover:bg-none uppercase flex items-center font-extrabold px-3 py-2 w-full disabled:opacity-20 text-sm"
      >
        todo up
      </button>
      <button
        class="list-btn transition hover:bg-dark-lighter disabled:hover:bg-none uppercase flex items-center font-extrabold px-3 py-2 w-full disabled:opacity-20 text-sm"
      >
        in progress up
      </button>
      <button
        class="list-btn transition hover:bg-dark-lighter disabled:hover:bg-none uppercase flex items-center font-extrabold px-3 py-2 w-full disabled:opacity-20 text-sm"
      >
        completed up
      </button>
      <button
        class="list-btn transition hover:bg-dark-lighter disabled:hover:bg-none uppercase flex items-center font-extrabold px-3 py-2 w-full disabled:opacity-20 text-sm"
      >
        failed up
      </button>
    </div>
  </div>
</template>
