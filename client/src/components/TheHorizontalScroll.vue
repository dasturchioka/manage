<script lang="ts" setup></script>

<template>
  <div class="scrollable-section">
    <div class="titles">
      <slot name="titles" />
    </div>
    <div class="content custom-scroll-h flex w-full space-x-4 overflow-x-scroll overflow-y-auto h-screen">
      <slot name="content" />
    </div>
  </div>
</template>
