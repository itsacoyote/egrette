<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table
      v-if="!error"
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
      <tbody v-if="!(isFetching && isPending)">
        <tr
          v-for="transaction in data.result"
          :key="transaction.hash"
        >
          <td>{{ formatShortAddress(transaction.hash, 7, 4) }}</td>
          <td>{{ transaction.methodId }}</td>
          <td>{{ dayjs(new Date(Number(transaction.timeStamp) * 1000).toLocaleDateString()).fromNow() }}</td>
          <td>{{ formatShortAddress(transaction.from) }}</td>
          <td>{{ formatShortAddress(transaction.to) }}</td>
          <td>{{ formatUnits(transaction.fee, 18) }}</td>
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

    <div
      v-else
      role="alert"
      class="alert alert-error alert-soft"
    >
      <span>An error occurred with trying to load transaction data.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { formatUnits } from "viem"

dayjs.extend(relativeTime)

const { blockExplorerApiUrl } = useNetworkStore()
const account = useAccount()

const fetchTransactions = async () =>
  await fetch(`${blockExplorerApiUrl}/api?module=account&action=txlist&page=1&offset=10&sort=descr&endblock=99999999&startblock=0&address=${account.address.value}`)
    .then(response =>
      response.json())

const {
  isPending, isFetching, data, error,
} = useQuery({
  queryKey: [ "transactions" ],
  queryFn: fetchTransactions,
})
</script>
