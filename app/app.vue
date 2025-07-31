<template>
  <ClientOnly>
    <LayoutNavbar />
    <NuxtPage />
  </ClientOnly>
</template>

<script setup lang="ts">
useConnectorStore()
</script>
