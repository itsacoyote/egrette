<template>
  <div
    v-if="isNull(isConnected)"
    class="text-center py-10"
  >
    <span
      class="loading loading-spinner loading-xl"
    />
  </div>
  <template v-else>
    <template v-if="isConnected">
      <slot />
    </template>
    <div
      v-else
      role="alert"
      class="alert alert-vertical sm:alert-horizontal"
    >
      <Icon
        name="fluent:wallet-16-regular"
        class="text-2xl"
      />
      <span>Connect wallet to see details.</span>
      <div>
        <AccountConnectButton />
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { isNull } from "es-toolkit"

const { isConnected } = storeToRefs(useConnectorStore())
</script>
