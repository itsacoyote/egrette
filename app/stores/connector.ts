import { createAppKit } from "@reown/appkit/vue"

import { customMetadata } from "~~/custom/app-config"

const metadata = customMetadata ?? {
  name: "Egrette",
  description: "Egrette - simple web dapp",
  url: "https://egrette.xyz",
  icons: [ "https://egrette.xyz/egrette-logo.svg" ],
}

export const useConnectorStore = defineStore("connector", () => {
  const {
    appKitNetworks, defaultNetwork, wagmiAdapter, projectId,
  } = useConnectorConfig()

  createAppKit({
    adapters: [ wagmiAdapter ],
    networks: appKitNetworks,
    defaultNetwork: defaultNetwork,
    projectId,
    metadata,
    enableWalletConnect: true,
    enableNetworkSwitch: false,
    enableWalletGuide: false,
    featuredWalletIds: [ "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96" ],
    features: {
      swaps: false,
      onramp: false,
      socials: [],
      email: false,
      analytics: false,
      connectMethodsOrder: [ "wallet" ],

    },
  })

  return { wagmiConfig: wagmiAdapter.wagmiConfig }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConnectorStore, import.meta.hot))
}
