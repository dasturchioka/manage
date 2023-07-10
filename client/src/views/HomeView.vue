<script setup lang="ts">
import TheTableOfTasks from "@/components/TheTableOfTasks.vue";
</script>

<template>
  <main class="overview-page sm:px-4 px-2 space-y-12 w-full">
    <div class="titles">
      <h1>Overview</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ex
        distinctio quaerat
      </p>
    </div>
    <TheTableOfTasks />
  </main>
</template>

<style scoped>
.overview-page {
  justify-self: start;
}
</style>
