<script lang="ts" setup>
import { RouterView } from "vue-router";
import TheSidebar from "@/components/TheSidebar.vue";
import { useUser } from "@/stores/user";
import { onMounted } from "vue";

const userStore = useUser();

onMounted(async () => {
  await userStore.getUser();
});
</script>

<template>
  <div class="default-layout flex text-white min-h-screen font-main">
    <TheSidebar />
    <RouterView />
  </div>
</template>
