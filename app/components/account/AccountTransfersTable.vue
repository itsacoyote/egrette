<template>
  <ul
    class="list bg-base-100 rounded-box shadow-md"
  >
    <template v-if="!(isFetching && isPending) && !error">
      <template v-if="data && data.length">
        <li
          v-for="transfer in data"
          :key="transfer.hash"
          class="list-row"
        >
          <div>
            <div>From: {{ formatShortAddress(transfer.from) }}</div>
            <div>To: {{ formatShortAddress(transfer.to) }}</div>
          </div>
          <div>
            <div>Amount: {{ formatUnits(transfer.value, transfer.tokenDecimal) }} {{ transfer.tokenSymbol }}</div>
          </div>
          <div>
            <NuxtLink
              target="_blank"
              :href="`${blockExplorerUrl}/tx/${transfer.hash}`"
              class="btn btn-circle"
            >

              <Icon name="fluent:open-32-filled" />
            </NuxtLink>
          </div>
        </li>
      </template>
      <template v-else>
        <li class="px-4 py-6 text-center">
          <div>No transfer history to show.</div>
        </li>
      </template>
    </template>
    <template v-else-if="error">
      <CommonAlertPane>
        An error occurred with trying to load transfer history data.
      </CommonAlertPane>
    </template>
    <template v-else>
      <!-- Loading -->
      <li class="list-row">
        <div><div class="skeleton h-4 w-15" /></div>
        <div><div class="skeleton h-4 w-15" /></div>
        <div><div class="skeleton h-4 w-15" /></div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"
import { type Address, formatUnits } from "viem"

const { blockExplorerUrl } = useNetworkStore()

const { blockExplorerApiUrl } = useNetworkStore()
const account = useAccount()

interface Transfer {
  blockNumber: number
  timeStamp: number
  hash: `0x${string}`
  nonce: number
  blockHash: `0x${string}`
  transactionIndex: number
  from: Address
  to: Address
  value: bigint
  tokenName: string
  tokenSymbol: string
  tokenDecimal: number
  gas: bigint
  gasPrice: bigint
  input: `0x${string}`
  contractAddress: Address
  cumulativeGasUsed: bigint
  gasUsed: bigint
  confirmations: number
  fee: bigint
  l1BatchNumber: number
  transactionType: number
}

const fetchTransfers = async () =>
  await fetch(`${blockExplorerApiUrl}/api?module=account&action=tokentx&page=1&offset=10&sort=desc&endblock=99999999&startblock=0&address=${account.address.value}`)

const {
  isPending, isFetching, data, error,
} = useQuery({
  queryKey: [
    "account",
    "transfers",
    account.address,
  ],
  queryFn: () => fetchBlockExplorerApiData<Transfer[]>(fetchTransfers),
  retry: blockExplorerApiRetry,
})
</script>
