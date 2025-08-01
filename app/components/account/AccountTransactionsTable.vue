<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table
      class="table"
    >
      <thead>
        <tr>
          <th>Transaction Hash</th>
          <th>Method</th>
          <th>Age</th>
          <th>From</th>
          <th>To</th>
          <th>Fee</th>
        </tr>
      </thead>
      <tbody v-if="!(isFetching && isPending) && !error">
        <template v-if="data && data.length">
          <tr
            v-for="transaction in data"
            :key="transaction.hash"
          >
            <td>{{ formatShortAddress(transaction.hash, 7, 4) }}</td>
            <td>{{ transaction.methodId }}</td>
            <td>{{ dayjs(new Date(Number(transaction.timeStamp) * 1000).toLocaleDateString()).fromNow() }}</td>
            <td>{{ formatShortAddress(transaction.from) }}</td>
            <td>{{ formatShortAddress(transaction.to) }}</td>
            <td>
              <!-- TODO: get the basetoken symbol to display -->
              <CommonAmountTooltip :formatted-amount="formattedFee(transaction.fee)" />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td
              colspan="6"
              class="text-center"
            >
              You have no transactions to display.
            </td>
          </tr>
        </template>
      </tbody>
      <tbody v-else-if="error">
        <tr>
          <td colspan="6">
            <CommonAlertPane>
              An error occurred with trying to load account transaction data.
            </CommonAlertPane>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr
          v-for="row in 3"
          :key="row"
        >
          <td><div class="skeleton h-4 w-15" /></td>
          <td><div class="skeleton h-4 w-10" /></td>
          <td><div class="skeleton h-4 w-15" /></td>
          <td><div class="skeleton h-4 w-15" /></td>
          <td><div class="skeleton h-4 w-15" /></td>
          <td><div class="skeleton h-4 w-20" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { type Address, formatUnits } from "viem"

dayjs.extend(relativeTime)

const { blockExplorerApiUrl } = useNetworkStore()
const account = useAccount()

interface Transaction {
  blockNumber: number
  timeStamp: number
  hash: `0x${string}`
  nonce: number
  blockHash: `0x${string}`
  transactionIndex: number
  from: Address
  to: Address
  value: number
  gas: bigint
  gasPrice: bigint
  isError: number
  txreceipt_status: number
  input: `0x${string}`
  contractAddress: Address | null
  cumulativeGasUsed: number
  gasUsed: bigint
  confirmations: number
  fee: bigint
  commitTxHash: `0x${string}`
  commitChainId: number
  proveTxHash: `0x${string}`
  proveChainId: number
  executeTxHash: `0x${string}`
  executeChainId: number
  isL1Originated: number
  l1BatchNumber: number
  type: number
  methodId: `0x${string}`
  functionName: string
}

const fetchTransactions = async () =>
  await fetch(`${blockExplorerApiUrl}/api?module=account&action=txlist&page=1&offset=10&sort=descr&endblock=99999999&startblock=0&address=${account.address.value}`)

const {
  isPending, isFetching, data, error,
} = useQuery({
  queryKey: [
    "account",
    "transactions",
    account.address,
  ],
  queryFn: () => fetchBlockExplorerApiData<Transaction[]>(fetchTransactions),
  retry: blockExplorerApiRetry,
})

const formattedFee = (fee: bigint): [string, string] => {
  const formattedUnits = formatUnits(fee, 18)
  return [
    truncateDecValue(formattedUnits),
    formattedUnits,
  ]
}
</script>
