import { getChainId } from "@wagmi/core"
import { acceptHMRUpdate, defineStore } from "pinia"
import type { Chain } from "viem"

export const useNetworkStore = defineStore("network", {
  state: () => ({}),
  getters: {
    activeChain(): Chain {
      const chainId = useChainId()
      const chains = useChains()
      return chains.value.find(chain => chain.id === chainId.value)!
    },
    blockExplorerUrl(): string {
      const networkData = useAppKitNetwork()
      return networkData.value.caipNetwork?.blockExplorers!.default.url as string
    },
    blockExplorerApiUrl(): string {
      const networkData = useAppKitNetwork()
      return networkData.value.caipNetwork?.blockExplorers!.default.apiUrl as string
    },
    chainId(): number {
      const { wagmiAdapter } = useConnectorConfig()
      return getChainId(wagmiAdapter.wagmiConfig)
    },
  },
  actions: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNetworkStore, import.meta.hot))
}
