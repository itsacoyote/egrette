<template>
  <ClientOnly>
    <LayoutProfileDrawer>
      <LayoutNavbar />
      <div class="m-auto max-w-[1100px] mt-6 px-4">
        <NuxtPage />
      </div>
    </LayoutProfileDrawer>
  </ClientOnly>
</template>

<script setup lang="ts">
useConnectorStore()
useAccountStore()
</script>
