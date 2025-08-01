import { getChainId } from "@wagmi/core"
import { acceptHMRUpdate, defineStore } from "pinia"

export const useNetworkStore = defineStore("network", {
  state: () => ({}),
  getters: {
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
