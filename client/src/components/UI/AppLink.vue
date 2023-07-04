<script lang="ts" setup>
import { RouterLink } from "vue-router";
defineProps({
  path: {
    type: String,
    required: true,
  },
  
});
</script>

<template>
  <RouterLink
    :to="path"
    class="font-medium px-4 py-3 flex flex-row items-center transition hover:bg-dark-lighter"
  >
    <slot />
  </RouterLink>
</template>

<style scoped>
.router-link-active,
.router-link-exact-active {
  @apply bg-purple;
}
</style>
