<template>
  <div class="text-md text-neutral-500">
    {{ useTimeAgo(date) }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ date: string }>()
</script>
