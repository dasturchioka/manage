<script lang="ts" setup>
defineProps({
  purpleBg: {
    type: Boolean,
    default: () => true,
  },
});
</script>

<template>
  <button
    class="font-bold rounded px-4 py-2 disabled:text-gray-400 disabled:cursor-not-allowed"
    :class="{ 'bg-purple text-white': purpleBg, 'text-purple bg-white': !purpleBg}"
  >
    <slot />
  </button>
</template>
