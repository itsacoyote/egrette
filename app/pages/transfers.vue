<template>
  <div>
    <h1 class="text-3xl">
      {{ $t('transfers.header') }}
    </h1>

    <ul v-if="!(isFetching && isPending)">
      <li
        v-for="transfer in data.result"
        :key="transfer.hash"
      >
        {{ transfer }}
      </li>
    </ul>

    <!-- <ul class="list bg-base-100 rounded-box shadow-md">
      <li v-if="isFetching && isPending" />
      <li
        v-else
        class="list-row"
      >
        <div>
          <img
            class="size-10 rounded-box"
            src="https://img.daisyui.com/images/profile/demo/1@94.webp"
          >
        </div>
        <div>
          <div>Dio Lupa</div>
          <div class="text-xs uppercase font-semibold opacity-60">
            Remaining Reason
          </div>
        </div>
        <button class="btn btn-square btn-ghost">
          <svg
            class="size-[1.2em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          ><g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            fill="none"
            stroke="currentColor"
          ><path d="M6 3L20 12 6 21 6 3z" /></g></svg>
        </button>
        <button class="btn btn-square btn-ghost">
          Button
        </button>
      </li>
    </ul> -->
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const transferUrl = "https://block-explorer-api.mainnet.zksync.io/api?module=account&action=tokentx&page=1&offset=10&sort=desc&endblock=99999999&startblock=0&address=0x0f6bfc4C284e489B404715B3F2610b0eb50FdE35"

const { blockExplorerApiUrl } = useNetworkStore()
const account = useAccount()

const fetchTransfers = async () =>
  await fetch(`${blockExplorerApiUrl}/api?module=account&action=tokentx&page=1&offset=10&sort=desc&endblock=99999999&startblock=0&address=${account.address.value}`)
    .then(response =>
      response.json())

const {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isPending, isFetching, data, error,
} = useQuery({
  queryKey: [ "transfers" ],
  queryFn: fetchTransfers,
})
</script>
