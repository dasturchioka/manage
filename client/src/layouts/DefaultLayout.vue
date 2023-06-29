<script lang="ts" setup>
import { RouterView } from "vue-router";
import TheSidebar from "@/components/TheSidebar.vue";
</script>

<template>
  <div class="default-layout flex text-white min-h-screen font-main">
    <TheSidebar />
    <RouterView />
  </div>
</template>
