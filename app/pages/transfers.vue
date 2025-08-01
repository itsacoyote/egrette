<template>
  <div>
    <h1 class="text-3xl mb-4">
      {{ $t('transfers.header') }}
    </h1>
    <ConnectionView>
      <AccountTransfersTable />
    </ConnectionView>
  </div>
</template>

<script setup lang="ts">

</script>
