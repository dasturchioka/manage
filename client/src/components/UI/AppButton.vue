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
  smallBtn: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    v-if="!linkAlike && !smallBtn"
    class="font-bold rounded px-4 py-2 disabled:text-gray-400 disabled:cursor-not-allowed"
    :class="{
      'bg-purple text-white': purpleBg,
      'text-purple bg-white': !purpleBg,
    }"
  >
    <slot />
  </button>
  <button
    v-else-if="linkAlike"
    class="font-medium px-4 py-3 flex flex-row items-center transition hover:bg-dark-lighter w-full"
  >
    <slot />
  </button>
  <button
    class="list-btn transition hover:bg-dark-lighter disabled:hover:bg-none uppercase flex items-center font-extrabold px-3 py-2 w-full disabled:opacity-20 text-sm"
    v-else-if="smallBtn"
  >
    <slot />
  </button>
</template>
