<template>
  <div>
    <LayoutPageHeader>
      {{ $t('assets.header') }}
      <template #right-col>
        <CommonNetworkSelect />
      </template>
    </LayoutPageHeader>

    <ConnectionView>
      <AccountAssetsTable />
    </ConnectionView>
  </div>
</template>

<script lang="ts" setup>
</script>
