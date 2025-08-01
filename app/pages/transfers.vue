<template>
  <div>
    <h1 class="text-3xl mb-4">
      {{ $t('transfers.header') }}
    </h1>

    <ConnectionView>
      <ul
        v-if="!error"
        class="list bg-base-100 rounded-box shadow-md"
      >
        <template v-if="!(isFetching && isPending)">
          <template v-if="data.result.length">
            <li
              v-for="transfer in data.result"
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
        <template v-else>
          <!-- Loading -->
          <li class="list-row">
            <div><div class="skeleton h-4 w-15" /></div>
            <div><div class="skeleton h-4 w-15" /></div>
            <div><div class="skeleton h-4 w-15" /></div>
          </li>
        </template>
      </ul>
      <div
        v-else
        role="alert"
        class="alert alert-error alert-soft"
      >
        <span>An error occurred with trying to load transaction data.</span>
      </div>
    </ConnectionView>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"
import { formatUnits } from "viem"

const { blockExplorerUrl } = useNetworkStore()

const { blockExplorerApiUrl } = useNetworkStore()
const account = useAccount()

// TODO: identify & handle error from endpoint since it's a 200
const fetchTransfers = async () =>
  await fetch(`${blockExplorerApiUrl}/api?module=account&action=tokentx&page=1&offset=10&sort=desc&endblock=99999999&startblock=0&address=${account.address.value}`)
    .then(response =>
      response.json())

const {

  isPending, isFetching, data, error,
} = useQuery({
  queryKey: [
    "account",
    "transfers",
    account.address,
  ],
  queryFn: fetchTransfers,
})
</script>
