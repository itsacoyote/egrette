<template>
  <div class="flex flex-row justify-between">
    <h1 class="text-3xl mb-4">
      <slot />
    </h1>
    <div>
      <slot name="right-col" />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
