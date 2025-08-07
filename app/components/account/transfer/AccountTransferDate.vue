<template>
  <div class="text-base text-neutral-500">
    {{ useTimeAgo(date, 'twitter') }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ date: string }>()
</script>
