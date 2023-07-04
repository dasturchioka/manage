<script lang="ts" setup>
defineProps({
  action: {
    type: Function,
    default: () => null,
  },
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
    @click="action"
  >
    <slot />
  </button>
</template>
