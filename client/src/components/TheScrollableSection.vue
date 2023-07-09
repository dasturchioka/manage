<script lang="ts" setup>
defineProps({
    horizontal: {
        type: Boolean,
        default: true
    },
    vertical: {
        type: Boolean,
        default: false
    },
})
</script>

<template>
  <div class="scrollable-section">
    <div class="titles">
      <slot name="titles" />
    </div>

  </div>
</template>
