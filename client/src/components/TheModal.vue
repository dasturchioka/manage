<script setup lang="ts">
import { useModal } from "@/stores/modal";
import AppButton from "./UI/AppButton.vue";

const modal = useModal();
</script>

<template>
  <div class="modal h-screen w-full bg-dark bg-opacity-75 backdrop-blur fixed z-[99999999] flex items-center justify-center">
    <div
      class="modal-box rounded text-center bg-dark-lighter border-white shadow p-4"
    >
      <p class="text text-lg font-bold mb-4">Are you sure?</p>
      <div class="buttons space-x-4 flex items-center justify-center">
        <AppButton @click="modal.cancel()" :purple-bg="false">
          CANCEL
        </AppButton>
        <AppButton @click="modal.confirm()"> CONFIRM </AppButton>
      </div>
    </div>
  </div>
</template>
