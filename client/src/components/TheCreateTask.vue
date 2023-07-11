<script lang="ts" setup>
import { ref } from "vue";

const showForm = ref(false);

const handleForm = () => {
  showForm.value = !showForm.value;
};
</script>

<template>
  <form class="overflow-x-auto w-full min-w-[548px]">
    <div ref="outsideClickTarget" class="w-full">
      <button
        type="button"
        @click="handleForm"
        class="create-btn text-sm opacity-30 flex items-center transition hover:bg-[#e5e7eb] hover:bg-opacity-[15%] px-2 py-1 rounded w-full"
      >
        <span class="text-lg mr-2">{{ !showForm ? `&plus;` : `&minus;` }}</span>
        {{ !showForm ? "Create new task" : "Discard" }}
      </button>
      <transition name="fade" mode="out-in">
        <div
          v-if="showForm"
          class="form-group mt-2 w-full border border-purple rounded"
        >
          <input
            type="text"
            placeholder="New task"
            class="outline-none bg-transparent px-3 py-1 w-[40%]"
          />
        </div>
      </transition>
    </div>
  </form>
</template>
