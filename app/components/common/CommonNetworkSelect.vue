<!-- eslint-disable @stylistic/max-len -->
<template>
  <Select.Root v-model="networkStore.activeNetwork.id">
    <Select.Trigger
      class="inline-flex w-full items-center justify-between rounded-lg px-[15px] text-xs leading-none h-[35px] gap-[5px] bg-white text-grass11 hover:bg-stone-50 border shadow-sm focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9 outline-none cursor-pointer"
      aria-label="Customise options"
    >
      <Select.Value :placeholder="networkStore.activeNetwork.name" />
      <Icon
        name="fluent:chevron-down-16-regular"
        class="h-3.5 w-3.5"
      />
    </Select.Trigger>

    <Select.Portal>
      <Select.Content
        class="min-w-[160px] bg-white rounded-lg border shadow-sm will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
        :side-offset="5"
      >
        <Select.ScrollUpButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <Icon name="fluent:chevron-up-16-regular" />
        </Select.ScrollUpButton>

        <Select.Viewport class="p-[5px]">
          <Select.Label class="px-[25px] text-xs leading-[25px] text-mauve11">
            {{ networkStore.testnet ? 'Testnets' : 'Mainnets' }}
          </Select.Label>
          <Select.Group>
            <Select.Item
              v-for="(network, index) in networkStore.zkSyncNetworks"
              :key="index"
              class="cursor-pointer text-xs leading-none text-grass11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select.-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
              :value="network.id"
              @select="networkStore.changeActiveNetwork(network.id)"
            >
              <Select.ItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                <Icon name="fluent:checkmark-16-regular" />
              </Select.ItemIndicator>
              <Select.ItemText>
                {{ network.name }}
              </Select.ItemText>
            </Select.Item>
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
        >
          <Icon name="radix-icons:chevron-down" />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
</template>

<script setup lang="ts">
import { Select } from "reka-ui/namespaced"

const networkStore = useNetworkStore()
</script>
