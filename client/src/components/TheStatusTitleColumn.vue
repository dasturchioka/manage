<script setup lang="ts">
defineProps<{ borderColor: string }>();
</script>

<template>
  <div
    :class="`border-t-${borderColor}`"
    class="status-title bg-dark-secondary transition py-2 px-4 rounded border-t"
  >
    
  </div>
</template>
