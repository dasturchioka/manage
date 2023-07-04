<script setup lang="ts">
import { RouterView } from "vue-router";
import { useLoading } from "./stores/loading";
import TheLoading from "@/components/TheLoading.vue";

const loading = useLoading()
</script>

<template>
  <div class="wrapper bg-black">
    <TheLoading v-if="loading.loading" />
    <RouterView />
  </div>
</template>

<style>
.Vue-Toastification__toast--default,
.Vue-Toastification__toast--success,
.Vue-Toastification__toast--warning,
.Vue-Toastification__toast--info,
.Vue-Toastification__toast--error {
  background: white;
  color: #000;
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  font-size: 16px;
  min-width: 250px;
  min-height: auto;
  padding: 15px;
}

.Vue-Toastification__close-button {
  color: #000;
}
</style>
