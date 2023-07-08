<script lang="ts" setup>
defineProps({
  purpleBg: {
    type: Boolean,
    default: () => true,
  },
  linkAlike: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    v-if="!linkAlike"
    class="font-bold rounded px-4 py-2 disabled:text-gray-400 disabled:cursor-not-allowed"
    :class="{
      'bg-purple text-white': purpleBg,
      'text-purple bg-white': !purpleBg,
    }"
  >
    <slot />
  </button>
  <button
    v-else
    class="font-medium px-4 py-3 flex flex-row items-center transition hover:bg-dark-lighter w-full"
  >
    <slot />
  </button>
</template>
