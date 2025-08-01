import { createAppKit } from "@reown/appkit/vue"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import type { AppKitNetwork } from "@reown/appkit-common"
import type { Chain } from "@wagmi/core/chains"
import { isNil } from "es-toolkit"

import { customAppKitConfig, customMetadata } from "~~/custom/app-config"

const metadata = customMetadata ?? {
  name: "Egrette",
  description: "Egrette - simple web dapp",
  url: "https://egrette.xyz",
  icons: [ "https://egrette.xyz/egrette-logo.svg" ],
}

const appKitConfiguration: AppKitConfig = {
  enableWalletConnect: true,
  enableNetworkSwitch: false,
  enableWalletGuide: false,
  featuredWalletIds: [ "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96" ],
  ...customAppKitConfig,
  features: {
    swaps: false,
    onramp: false,
    socials: false,
    email: false,
    analytics: false,
    connectMethodsOrder: [
      "email",
      "social",
      "wallet",
    ],
    ...customAppKitConfig.features,
  },
  themeVariables: {
    "--w3m-font-family": "var(--font-sans)",
    "--w3m-accent": "var(--accent-primary)",
    "--w3m-color-mix": "var(--color-neutral-content)",
    "--w3m-color-mix-strength": 30,
    "--w3m-border-radius-master": "var(--radius-box)",
    ...customAppKitConfig.themeVariables,
  },
}

export const useConnectorConfig = () => {
  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  const projectId = runtimeConfig.public.reownProjectId

  const allChains = [
    ...appConfig.networks,
    ...appConfig.networks.map(network => network.l1Network),
  ]
    .filter((chain): chain is Chain => !!chain && (chain as Chain).id !== undefined)
    .reduce<Chain[]>((acc, chain) => {
      if (!acc.some(c => c.id === chain.id)) {
        acc.push(chain)
      }
      return acc
    }, [])

  const defaultNetwork = allChains.find(chain => chain.id === appConfig.defaultNetwork.id)
  if (isNil(defaultNetwork)) {
    throw new Error("Default network must be included in list of networks in appConfig")
  }

  const wagmiAdapter = new WagmiAdapter({
    networks: allChains,
    projectId,
  })

  createAppKit({
    adapters: [ wagmiAdapter ],
    networks: allChains as [AppKitNetwork, ...AppKitNetwork[]],
    metadata: metadata,
    projectId,
    defaultNetwork: defaultNetwork,
    ...appKitConfiguration,
  })

  return {
    allChains,
    wagmiAdapter,
  }
}
