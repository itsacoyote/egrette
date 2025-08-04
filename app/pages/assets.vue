<template>
  <div>
    <h1 class="text-3xl mb-4">
      {{ $t('assets.header') }}
    </h1>

    <ConnectionView>
      <AccountAssetsTable />
    </ConnectionView>
  </div>
</template>

<script lang="ts" setup>
</script>
