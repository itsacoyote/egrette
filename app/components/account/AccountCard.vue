<template>
  <div class="card bg-base-100 card-md shadow-sm">
    <div class="card-body">
      <p>Network ID: {{ chainId }}</p>
      <p>Address: {{ account.address }}</p>
      <p>Balance: <AccountBalance /></p>
    </div>
  </div>
</template>

<script setup lang="ts">
const account = useAccount()
const { chainId } = useNetworkStore()
</script>
