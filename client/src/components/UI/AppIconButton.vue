<script lang="ts" setup>
import { useLoading } from "@/stores/loading";

const loadingStore = useLoading();

type Booleanish = boolean | "true" | "false";
</script>

<template>
  <button
    :disabled="(loadingStore.loading as Booleanish)"
    class="rounded p-2 transition hover:bg-dark-lighter disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <slot />
  </button>
</template>
