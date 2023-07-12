<script setup lang="ts">
import { ref } from "vue";
import TheTableSort from "./TheTableSort.vue";
defineProps<{ title: string }>();

const showForm = ref(false);

const handleForm = () => (showForm.value = !showForm.value);
</script>

<template>
  <div class="dashboard-title bg-dark-secondary transition py-2 px-4 rounded border-t border-t-purple">
    <div class="titles flex items-center justify-between">
      <h3 class="title first-letter:uppercase">{{ title }}</h3>
      <div class="functions">
        <TheTableSort />
      </div>
    </div>
  </div>
</template>
