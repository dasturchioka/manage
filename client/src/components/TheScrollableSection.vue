<script lang="ts" setup>
defineProps({
  horizontal: {
    type: Boolean,
    default: true,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="scrollable-section h-screen">
    <div class="titles">
      <slot name="titles" />
    </div>
    <div
      :class="{
        'flex w-full space-x-4 overflow-x-scroll': horizontal,
        'max-h-full w-full overflow-x-hidden overflow-y-scroll ': vertical,
      }"
      class="content custom-scroll"
    >
      <slot name="content" />
    </div>
  </div>
</template>
