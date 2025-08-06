<template>
  <div>
    <LayoutPageHeader>
      {{ $t('transfers.header') }}
      <template #right-col>
        <CommonNetworkSelect />
      </template>
    </LayoutPageHeader>

    <ConnectionView>
      <AccountTransfersTable />
    </ConnectionView>
  </div>
</template>

<script setup lang="ts">

</script>
