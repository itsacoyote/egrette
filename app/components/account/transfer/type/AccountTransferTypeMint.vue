<template>
  <AccountTransferIcon :transfer="transfer" />
  <div>
    <div class="text-lg">
      Minted
    </div>
    <AccountTransferDate :date="transfer.timestamp" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ transfer: Transfer }>()
</script>
