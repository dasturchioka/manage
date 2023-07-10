<script setup lang="ts">
import TheListOfTasks from '@/components/TheListOfTasks.vue';
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
    <TheListOfTasks/>
  </main>
</template>

<style scoped>
.overview-page {
  justify-self: start;
}
</style>
