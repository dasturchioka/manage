<script setup lang="ts">
import { useToast } from "vue-toastification";
import { globalInstance } from "@/http";

const toast = useToast();

const sendRequest = async () => {
  const res = await globalInstance.get("")
  const data = await res.data

  toast(data.msg)
}
</script>

<template>
  <main class="overview-page">
    <button
      @click="sendRequest"
      class="bg-white text-black"
    >
      Click
    </button>
  </main>
</template>
