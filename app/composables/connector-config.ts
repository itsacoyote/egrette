import type { Chain } from "@wagmi/core/chains"
import { createConfig } from "@wagmi/vue"
import { walletConnect } from "@wagmi/vue/connectors"
import { isNil } from "es-toolkit"
import { fallback, http } from "viem"

import { customMetadata } from "~~/custom/app-config"

let wagmiConfig: unknown
const metadata = customMetadata ?? {
  name: "Egrette",
  description: "Egrette - simple web dapp",
  url: "https://egrette.xyz",
  icons: [ "https://egrette.xyz/egrette-logo.svg" ],
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
  const transports = allChains.map(chain => [
    chain.id,
    fallback(chain.rpcUrls.default.http.map(url => http(url, { batch: true }))),
  ])

  const defaultNetwork = allChains.find(chain => chain.id === appConfig.defaultNetwork.id)
  if (isNil(defaultNetwork)) {
    throw new Error("Default network must be included in list of networks in appConfig")
  }

  if (isNil(wagmiConfig)) {
    wagmiConfig = createConfig({
      chains: allChains as [Chain, ...Chain[]],
      connectors: [ walletConnect({ projectId, metadata }) ],
      transports: Object.fromEntries(transports),
    })
  }

  return {
    allChains,
    defaultNetwork,
    projectId,
    wagmiConfig,
  }
}
