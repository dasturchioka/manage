<script setup lang="ts">
import TheHorizontalScroll from "@/components/TheHorizontalScroll.vue";
</script>

<template>
  <main class="overview-page sm:px-4 px-2 space-y-12 w-full">
    <TheHorizontalScroll>
      <template #titles>
        <h1>Overview</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ex
          distinctio quaerat
        </p>
      </template>
      <template #content>
        <div
          class="flex-shrink-0 min-h-56 px-5 py-4 bg-white rounded shadow-sm default-block w-80"
        ></div>
      </template>
    </TheHorizontalScroll>
  </main>
</template>

<style scoped>
.overview-page {
  justify-self: start;
}
</style>
