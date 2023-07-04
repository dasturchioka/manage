<script setup lang="ts">
import { useToast } from "vue-toastification";

const toast = useToast();
</script>

<template>
  <main class="overview-page">
    <button
      @click="toast('Default', { timeout: 10000000000000, type: 'success' })"
      class="bg-white text-black"
    >
      Click
    </button>
  </main>
</template>
