<script setup lang="ts">
import { ref } from "vue";
import TheTableSort from "./TheTableSort.vue";
import EditIcon from "./icons/Edit.vue";
defineProps<{ title: string }>();

const showForm = ref(false);
const titleB = ref("");

const handleForm = () => (showForm.value = !showForm.value);
</script>

<template>
  <div
    class="dashboard-title bg-dark-secondary transition py-2 px-4 rounded border-t border-t-purple"
  >
    <div class="titles flex items-center justify-between">
      <h3 v-show="!showForm" class="title first-letter:uppercase">
        {{ title }}
      </h3>
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
        <button
          v-show="!showForm"
          @click="handleForm"
          class="edit-btn rounded p-3 transition hover:bg-dark-lighter"
        >
          <EditIcon />
        </button>
        <button
          v-show="showForm"
          @click="handleForm"
          class="confirm-btn rounded p-2 transition hover:bg-dark-lighter"
        >
          <p>&check;</p>
        </button>
        <TheTableSort />
      </div>
    </div>
  </div>
</template>
