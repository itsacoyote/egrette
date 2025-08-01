<template>
  <CommonAmountTooltip
    v-if="accountBalance"
    :formatted-amount="prettyValue(accountBalance.value, accountBalance.decimals)"
    :symbol="accountBalance.symbol"
  />
  <div
    v-else
    class="align-middle inline-block skeleton h-4 w-20"
  />
</template>

<script setup lang="ts">
const account = useAccount()
const { chainId } = useNetworkStore()
const { data: accountBalance } = useBalance({ address: account.address, chainId })
</script>
