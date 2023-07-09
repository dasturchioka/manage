<script lang="ts" setup></script>

<template>
  <div class="scrollable-section">
    <div class="titles">
      <slot name="titles" />
    </div>
    <div class="content custom-scroll flex w-full space-x-4 overflow-x-scroll">
      <slot name="content" />
    </div>
  </div>
</template>
