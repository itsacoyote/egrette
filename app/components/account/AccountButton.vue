<template>
  <button
    v-if="!hasConnection"
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
      ADDRESS
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

const connections = useConnections()
const hasConnection = computed(() => connections.value.length > 0)
console.log("Connector", connections)
const { connect, connectors } = useConnect()
const walletConnect = connectors.find(connector => connector.id === "walletConnect")

const open = () => {
  console.log("opening")
  connect({ connector: walletConnect! })
}
</script>
