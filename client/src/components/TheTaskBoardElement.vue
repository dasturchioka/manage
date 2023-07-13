<script setup lang="ts">
import { ref } from "vue";
import AppIconButton from "./UI/AppIconButton.vue";
const showForm = ref(false);

const handleForm = () => (showForm.value = !showForm.value);
</script>

<template>
  <div
    class="board-element bg-dark-secondary transition py-2 px-4 rounded border-t border-t-purple"
  >
    <div class="titles flex items-center justify-between">
      <form
        v-show="showForm"
        class="edit-title-form first-letter:uppercase w-[170px]"
      >
        <input
          type="text"
          class="bg-transparent outline-none border rounded w-full"
        />
      </form>
      <div class="functions flex items-center">
        <AppIconButton v-show="!showForm" @click="handleForm">
          <EditIcon />
        </AppIconButton>
        <AppIconButton v-show="showForm" @click="handleForm">
          <p>&check;</p>
        </AppIconButton>
        <TheTableSort />
      </div>
    </div>
  </div>
</template>
