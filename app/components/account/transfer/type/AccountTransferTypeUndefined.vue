<template>
  <AccountTransferIcon :transfer="transfer" />
  <div>
    <div class="text-lg">
      {{ capitalize(transfer.type) }}
    </div>
    <AccountTransferDate :date="transfer.timestamp" />
  </div>
  <div>
    <AccountTransferToken :transfer />
  </div>
</template>

<script setup lang="ts">
import { capitalize } from "es-toolkit"

defineProps<{ transfer: Transfer }>()
</script>
