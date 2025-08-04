import { getChainId } from "@wagmi/core"
import { isBoolean } from "es-toolkit"
import { isObject } from "es-toolkit/compat"
import { acceptHMRUpdate, defineStore } from "pinia"

import type { L1Network, ZkSyncNetwork } from "~~/shared/types/networks"

export const useNetworkStore = defineStore("network", {
  state: () => ({ testnet: false }),
  getters: {
    activeNetwork(): ZkSyncNetwork {
      const chainId = useChainId()
      const chains = useChains()
      return chains.value.find(chain => chain.id === chainId.value)! as ZkSyncNetwork
    },
    activeNetworkL1(): L1Network | null {
      const l1Network = this.activeNetwork.l1Network
      return isBoolean(l1Network) ? null : l1Network
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
    zkSyncNetworks(state): ZkSyncNetwork[] {
      const chains = useChains()
      return chains.value
        .filter(chain => isObject((chain as ZkSyncNetwork).l1Network))
        .filter(chain => chain.testnet === state.testnet) as ZkSyncNetwork[]
    },
    l1Networks(state): L1Network[] {
      const chains = useChains()
      return chains.value
        .filter(chain => isBoolean((chain as ZkSyncNetwork).l1Network))
        .filter(chain => chain.testnet === state.testnet) as L1Network[]
    },
  },
  actions: {
    toggleTestnet() {
      this.testnet = !this.testnet
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNetworkStore, import.meta.hot))
}
