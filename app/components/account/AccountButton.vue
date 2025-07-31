<template>
  <button
    v-if="!isConnected"
    class="btn btn-primary"
    @click="open()"
  >
    Connect wallet
  </button>
  <DropdownMenu.Root
    v-else
    v-model:open="toggleState"
  >
    <DropdownMenu.Trigger class="btn btn-primary">
      {{ shortenedAddress }}
      &nbsp;<Icon :name="toggleState ? 'fluent:chevron-up-16-regular' : 'fluent:chevron-down-16-regular'" />
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content
        align="end"
        class="menu dropdown-content bg-base-100 rounded-field z-1 w-52 p-2 shadow-sm"
      >
        <DropdownMenu.Item>
          ITEM
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
</template>

<script setup lang="ts">
import { DropdownMenu } from "reka-ui/namespaced"

const toggleState = ref(false)

const accountData = useAppKitAccount({ namespace: "eip155" })
const isConnected = computed(() => accountData.value.isConnected)
const { open } = useAppKit()
const shortenedAddress = formatShortAddress(accountData.value.address)
setTimeout(() => {
  console.log("status??", accountData.value.isConnected)
}, 1000)

const connections = useConnections()
console.log("Connector", connections)
</script>
