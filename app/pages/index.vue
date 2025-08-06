<template>
  <div>
    <LayoutPageHeader>
      {{ $t('index.header') }}
      <template #right-col>
        <CommonNetworkSelect />
      </template>
    </LayoutPageHeader>

    <ConnectionView>
      <AccountSummaryCard />
    </ConnectionView>
  </div>
</template>

<script setup>
</script>
