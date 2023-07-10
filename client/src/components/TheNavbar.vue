<script setup lang="ts">
import { RouterLink } from "vue-router";

const emit = defineEmits(["btnClicked"]);
</script>

<template>
  <nav
    class="navbar fixed top-0 bg-dark-secondary w-full flex items-center justify-between px-2 py-4"
  >
    <button @click="emit('btnClicked')" class="bg-purple p-2 rounded">
      <img class="w-5" src="../assets/icons/hamburger.svg" alt="manage" />
    </button>
    <RouterLink to="/">
      <img class="w-24" src="../assets/icons/logo.svg" alt="manage logo" />
    </RouterLink>
  </nav>
</template>

<style scoped>
.navbar {
  display: none;
}

@media (max-width: 654px) {
  .navbar {
    display: flex;
  }
}
</style>
