<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="text-white">
   Dashboard is: {{ route.params.id }}
  </div>
</template>
