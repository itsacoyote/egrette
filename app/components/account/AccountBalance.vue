<template>
  <Tooltip.Provider v-if="accountBalance">
    <Tooltip.Root>
      <Tooltip.Trigger>
        <span>{{ formattedBalance }} {{ accountBalance.symbol }}</span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          class=" bg-white px-3 py-2 border border-gray-200 shadow-sm rounded-sm text-sm"
          :side-offset="5"
        >
          {{ formatUnits(accountBalance.value, accountBalance.decimals) }} {{ accountBalance.symbol }}
          <Tooltip.Arrow
            class="fill-white stroke-gray-200"
            :width="12"
            :height="6"
          />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
  <div
    v-else
    class="align-middle inline-block skeleton h-4 w-20"
  />
</template>

<script setup lang="ts">
import { Tooltip } from "reka-ui/namespaced"
import { formatUnits } from "viem"

const account = useAccount()
const { chainId } = useNetworkStore()
const { data: accountBalance } = useBalance({ address: account.address, chainId })

const formattedBalance = computed(() => {
  if (accountBalance.value) {
    const formatted = formatUnits(accountBalance.value.value, accountBalance.value.decimals)
    const [
      intPart,
      decPart = "",
    ] = formatted.split(".")
    const truncatedDec = decPart.slice(0, 4)
    return truncatedDec ? `${intPart}.${truncatedDec}` : intPart
  } else {
    return ""
  }
})
</script>
