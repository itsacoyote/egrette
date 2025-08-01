<template>
  <div>
    <button
      v-if="!hasConnection"
      class="btn btn-primary"
      @click="openModal()"
    >
      <template v-if="!opening">
        Connect wallet
      </template>
      <Icon
        v-else
        name="fluent:arrow-clockwise-28-filled"
        class="animate-spin"
      />
    </button>
    <DropdownMenu.Root
      v-else
      v-model:open="toggleState"
    >
      <DropdownMenu.Trigger class="btn btn-primary">
        <template v-if="address">
          {{ formatShortAddress(address) }}
          &nbsp;<Icon :name="toggleState ? 'fluent:chevron-up-16-regular' : 'fluent:chevron-down-16-regular'" />
        </template>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          class="menu dropdown-content bg-base-200 rounded-field z-1 w-52 shadow-md mt-2"
        >
          <DropdownMenu.Item
            class="cursor-pointer text-xl px-3 py-3 hover:bg-neutral-200 rounded-field"
            @click="copyAddress"
          >
            <Icon
              name="fluent:document-copy-20-regular"
              class="align-middle text-xl"
            />
            Copy Addresss
          </DropdownMenu.Item>
          <DropdownMenu.Item
            class="cursor-pointer text-xl px-3 py-3 hover:bg-neutral-200 rounded-field"
            :as-child="true"
          >
            <NuxtLink
              :href="`${blockExplorerUrl}/address/${address}`"
              target="_blank"
            >
              <Icon
                name="fluent:apps-20-filled"
                class="align-middle text-xl"
              />
              Explorer
            </NuxtLink>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            class="cursor-pointer text-xl px-3 py-3 hover:bg-neutral-200 rounded-field"
            @click="disconnectAccount"
          >
            <Icon
              name="fluent:power-20-filled"
              class="align-middle text-xl"
            />
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  </div>
</template>

<script setup lang="ts">
import { DropdownMenu } from "reka-ui/namespaced"

import { useNetworkStore } from "~/stores/network"

const toggleState = ref(false)

const { open } = useAppKit()
const { disconnect } = useAppKitDisconnect()
const connections = useConnections()
const hasConnection = computed(() => connections.value.length > 0)

const { address } = useAccount()
const { blockExplorerUrl } = useNetworkStore()

const appKitState = useAppKitState()
const opening = ref(false)
const openModal = () => {
  opening.value = true
  open()
}
watch(() => appKitState.open, (state) => {
  if (!state) {
    opening.value = false
  }
})

const disconnectAccount = async () => {
  await disconnect()
}

const copyAddress = () => {
  if (address.value) {
    navigator.clipboard.writeText(address.value)
  }
}
</script>
