<template>
  <ul class="list bg-base-100 rounded-box shadow-md">
    <template v-if="isFetching && isPending">
      <li class="list-row">
        <div><div class="skeleton h-4 w-15" /></div>
        <div><div class="skeleton h-4 w-15" /></div>
        <div><div class="skeleton h-4 w-15" /></div>
      </li>
    </template>
    <template v-else-if="error">
      Error!
    </template>
    <template v-else>
      <template v-if="filteredData && filteredData.length">
        <li
          v-for="asset in filteredData"
          :key="asset.TokenAddress"
          class="list-row"
        >
          <div>
            <Icon
              name="fluent:circle-highlight-24-regular"
              class="h-full w-12 h-12 text-slate-400"
            />
          </div>
          <div>
            <div class="text-lg">
              {{ asset.TokenSymbol }}
            </div>
            <div class="text-sm text-neutral-700">
              {{ asset.TokenName }}
            </div>
          </div>
          <div class="text-right">
            <div>
              <CommonAmountTooltip
                :formatted-amount="prettyValue(asset.TokenQuantity, asset.TokenDivisor)"
              />
            </div>
          </div>
        </li>
      </template>
      <li
        v-else
        class="px-4 py-6 text-center"
      >
        <div>No assets with balances to show.</div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"

const { blockExplorerApiUrl } = useNetworkStore()
const account = useAccount()

interface TokenBalance {
  TokenAddress: `0x${string}`
  TokenName: string
  TokenSymbol: string
  TokenQuantity: bigint
  TokenDivisor: number
}

const fetchAssets = async () =>
  await fetch(`${blockExplorerApiUrl}/api?module=account&action=addresstokenbalance&address=${account.address.value}`)

const {
  isPending, isFetching, data, error,
} = useQuery({
  queryKey: [
    "account",
    "assets",
    account.address,
  ],
  queryFn: () => fetchBlockExplorerApiData<TokenBalance[]>(fetchAssets),
  retry: blockExplorerApiRetry,
})

// Currently the API returns ERC721s along with ERC20s which
// is unintended behavior. This filters tokens returned without a name
// which includes ERC721s
const filteredData = computed(() => {
  if (data.value) {
    return data.value.filter(token => token.TokenName !== "")
  }
  return data.value
})
</script>
