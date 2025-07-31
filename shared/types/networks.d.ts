import type { Chain } from "@wagmi/core/chains"

export type L1Network = Chain

export type ZkSyncNetwork = {
  id: number
  key: string
  name: string
  rpcUrls: { default: { http: string[] } }
  blockExplorers: {
    default: {
      name: string
      url: string
      apiUrl: string
    }
  }
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  l1Network: L1Network
  testnet?: boolean
  nativeTokenBridgingOnly?: boolean
}
