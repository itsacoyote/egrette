import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import type { AppKitNetwork } from "@reown/appkit-common"
import type { Chain } from "@wagmi/core/chains"
import { isNil } from "es-toolkit"

export const useConnectorConfig = () => {
  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  const projectId = runtimeConfig.public.reownProjectId

  const allChains = [
    ...appConfig.networks,
    ...appConfig.networks.map(network => network.l1Network),
  ].filter((chain): chain is Chain => !!chain && (chain as Chain).id !== undefined)

  const defaultNetwork = allChains.find(chain => chain.id === appConfig.defaultNetwork.id)
  if (isNil(defaultNetwork)) {
    throw new Error("Default network must be included in list of networks in appConfig")
  }

  const appKitNetworks: [AppKitNetwork, ...AppKitNetwork[]] = allChains.map(chain => ({
    id: chain.id,
    name: chain.name,
    rpcUrls: chain.rpcUrls,
    nativeCurrency: chain.nativeCurrency,
  })) as [AppKitNetwork, ...AppKitNetwork[]]

  const wagmiAdapter = new WagmiAdapter({
    networks: appKitNetworks,
    projectId,
  })

  return {
    allChains,
    defaultNetwork,
    wagmiAdapter,
    projectId,
    appKitNetworks,
  }
}
