<template>
  <li class="list-row">
    <slot />
    <div>
      <NuxtLink
        target="_blank"
        :href="`${blockExplorerUrl}/tx/${transfer.transactionHash}`"
        class="btn btn-circle group"
      >
        <Icon
          name="fluent:open-32-filled"
          class="text-neutral-500 group-hover:text-neutral-900"
        />
      </NuxtLink>
    </div>
  </li>
</template>

<script setup lang="ts">
const { blockExplorerUrl } = useNetworkStore()
defineProps<{ transfer: Transfer }>()
</script>
